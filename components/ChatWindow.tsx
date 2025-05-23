import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import StreamingMessage from './StreamingMessage';
import { Message } from '../utils/storage';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  streamingUserMessage?: string;
  model: string;
  onStreamingComplete: (assistantMessage: string) => void;
}

export default function ChatWindow({
  messages,
  isLoading,
  isStreaming = false,
  streamingUserMessage = '',
  model = 'llama2',
  onStreamingComplete
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or streaming content updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[var(--cardBackground)] rounded-lg border border-[var(--border)] shadow-[var(--shadowMedium)] custom-scrollbar">
      {messages.length === 0 && !isStreaming ? (
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* NODE watermark in bottom right corner */}
          <div className="absolute bottom-2 right-2 opacity-10 pointer-events-none">
            <img src="/NODE_watermark.png" alt="NODE" className="w-24 h-24" />
          </div>
          <div className="mb-6 relative z-10">
            <img src="/FlameOS_logo.png" alt="FlameOS Logo" className="h-24" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-[var(--primaryText)] relative z-10">Welcome to LocoLama</h2>
          <p className="text-center max-w-md text-[var(--secondaryText)]">
            Your 100% local AI chat interface. All messages are processed on your device
            using Ollama. No data is sent to external servers.
          </p>
          <div className="mt-8 p-5 bg-[var(--border)] rounded-lg max-w-md border border-[var(--borderHover)] shadow-[var(--shadow)]">
            <h3 className="font-medium mb-2 text-[var(--primaryText)]">Getting Started</h3>
            <ul className="list-disc list-inside text-sm text-[var(--secondaryText)] space-y-1">
              <li>Make sure Ollama is running on your machine</li>
              <li>Select a model from the dropdown in the top right</li>
              <li>Type a message and press Enter to start chatting</li>
              <li>Toggle streaming mode for word-by-word responses</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {/* Regular messages */}
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                role={message.role}
                content={message.content}
                timestamp={new Date().toISOString()} // In a real app, this would come from the message
              />
            ))}

            {/* Loading indicator (non-streaming mode) */}
            {isLoading && !isStreaming && (
              <MessageBubble
                role="assistant"
                content="..."
                isLoading={true}
              />
            )}

            {/* Streaming message */}
            {isStreaming && streamingUserMessage && (
              <>
                <MessageBubble
                  role="user"
                  content={streamingUserMessage}
                  timestamp={new Date().toISOString()}
                />
                <StreamingMessage
                  userMessage={streamingUserMessage}
                  model={model}
                  onComplete={onStreamingComplete}
                />
              </>
            )}
          </div>

          <div ref={messagesEndRef} className="h-4" />
        </>
      )}
    </div>
  );
}
