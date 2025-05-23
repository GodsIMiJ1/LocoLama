import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion, generateStreamingCompletion, OllamaMessage } from '../../../lib/ollamaClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, model, stream = false, options = {} } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    if (!model || typeof model !== 'string') {
      return NextResponse.json(
        { error: 'Model is required and must be a string' },
        { status: 400 }
      );
    }

    // Handle streaming response
    if (stream) {
      const encoder = new TextEncoder();
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            const stream = await generateStreamingCompletion(model, messages, options);
            
            // Create a reader from the stream
            const reader = stream.getReader();
            
            // Process the stream
            const decoder = new TextDecoder();
            let responseText = '';
            
            while (true) {
              const { done, value } = await reader.read();
              
              if (done) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                controller.close();
                break;
              }
              
              // Decode the chunk and send it to the client
              const chunk = decoder.decode(value, { stream: true });
              
              try {
                // Parse the chunk as JSON
                const parsedChunk = JSON.parse(chunk);
                
                if (parsedChunk.message?.content) {
                  responseText += parsedChunk.message.content;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: parsedChunk.message.content })}\n\n`));
                }
              } catch (e) {
                // If the chunk is not valid JSON, just send it as is
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
              }
            }
          } catch (error) {
            console.error('Error in streaming response:', error);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error generating streaming response' })}\n\n`));
            controller.close();
          }
        }
      });

      return new NextResponse(customReadable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Handle non-streaming response
      const response = await generateCompletion(model, messages, options);
      return NextResponse.json({ response });
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response from Ollama' },
      { status: 500 }
    );
  }
}
