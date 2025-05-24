import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '../utils/storage';

interface StreamingMessageProps {
  userMessage: string;
  model: string;
  onComplete: (assistantMessage: string) => void;
}

export default function StreamingMessage({ userMessage, model, onComplete }: StreamingMessageProps) {
  const [streamedContent, setStreamedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const streamedContentRef = useRef('');

  useEffect(() => {
    // Reset state for new stream
    setStreamedContent('');
    setIsStreaming(true);
    setError(null);
    streamedContentRef.current = '';

    // Create messages array with user message
    const messages: Message[] = [
      { role: 'user', content: userMessage }
    ];

    // Create a custom EventSource for streaming
    const fetchController = new AbortController();

    // Send the request to start streaming
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model,
        stream: true,
      }),
      cache: 'no-store',
      signal: fetchController.signal,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();

      function processStream() {
        reader!.read().then(({ done, value }) => {
          if (done) {
            setIsStreaming(false);
            onComplete(streamedContentRef.current);
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n\n');

          lines.forEach(line => {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.substring(6));

                if (data.error) {
                  setError(data.error);
                  setIsStreaming(false);
                  return;
                }

                if (data.done) {
                  setIsStreaming(false);
                  onComplete(streamedContentRef.current);
                  return;
                }

                if (data.content) {
                  streamedContentRef.current += data.content;
                  setStreamedContent(streamedContentRef.current);
                }
              } catch (err) {
                console.error('Error parsing SSE message:', err, line);
              }
            }
          });

          processStream();
        }).catch(err => {
          // Don't show error for aborted requests (normal when component unmounts)
          if (err.name === 'AbortError') {
            return;
          }
          console.error('Error reading stream:', err);
          setError('Error reading stream. Please try again.');
          setIsStreaming(false);
        });
      }

      processStream();
    })
    .catch(err => {
      // Don't show error for aborted requests (normal when component unmounts)
      if (err.name === 'AbortError') {
        return;
      }
      console.error('Error initiating streaming request:', err);
      setError('Failed to connect to Ollama. Make sure it is running.');
      setIsStreaming(false);
    });

    // Store the abort controller for cleanup
    const controller = fetchController;
    eventSourceRef.current = {
      close: () => controller.abort()
    } as unknown as EventSource;

    // Clean up on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [userMessage, model]); // Dependencies

  // If there's an error, show it
  if (error) {
    return (
      <MessageBubble
        role="assistant"
        content={`Error: ${error}`}
      />
    );
  }

  return (
    <MessageBubble
      role="assistant"
      content={streamedContent || '...'}
      isLoading={isStreaming && !streamedContent}
    />
  );
}
