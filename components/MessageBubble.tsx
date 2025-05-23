import React from 'react';

interface MessageBubbleProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isLoading?: boolean;
  timestamp?: string;
}

export default function MessageBubble({
  role,
  content,
  isLoading = false,
  timestamp
}: MessageBubbleProps) {
  // Format timestamp if provided
  const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }) : null;

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-6 group`}>
      {/* Avatar for assistant */}
      {role === 'assistant' && (
        <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white mr-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <div className="flex flex-col max-w-[80%]">
        <div
          className={`p-4 ${
            role === 'user'
              ? 'message-user'
              : 'message-assistant'
          }`}
        >
          {isLoading ? (
            <div className="flex space-x-2 justify-center items-center h-6">
              <div className="w-2 h-2 bg-[var(--tertiaryText)] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[var(--tertiaryText)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-[var(--tertiaryText)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{content}</div>
          )}
        </div>

        {/* Timestamp */}
        {formattedTime && (
          <div className="text-xs text-[var(--tertiaryText)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {formattedTime}
          </div>
        )}
      </div>

      {/* Avatar for user */}
      {role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white ml-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}
