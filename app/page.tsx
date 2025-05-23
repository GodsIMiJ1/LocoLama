'use client';

import { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import ModelSelector from '../components/ModelSelector';
import ConversationSidebar from '../components/ConversationSidebar';
import GPUMonitor from '../components/GPUMonitor';
import ThemeToggle from '../components/ThemeToggle';
import { getChats, saveChat, Chat, Message } from '../utils/storage';
import { useThemeContext } from '../components/ThemeProvider';

export default function Home() {
  const [currentChat, setCurrentChat] = useState<Chat>({
    id: new Date().toISOString(),
    messages: [],
    model: 'llama2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingUserMessage, setStreamingUserMessage] = useState('');
  const [useStreaming, setUseStreaming] = useState(false);

  // Load chats from localStorage on initial render
  useEffect(() => {
    const savedChats = getChats();
    if (savedChats.length > 0) {
      setCurrentChat(savedChats[savedChats.length - 1]);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    if (useStreaming) {
      // Streaming mode
      setIsStreaming(true);
      setStreamingUserMessage(userMessage);
    } else {
      // Non-streaming mode
      // Add user message to chat
      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, { role: 'user', content: userMessage }]
      };
      setCurrentChat(updatedChat);
      setIsLoading(true);

      try {
        // Call local Ollama API through our proxy
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: updatedChat.messages,
            model: currentChat.model,
            stream: false,
          }),
          cache: 'no-store',
        });

        const data = await response.json();

        // Add assistant response to chat
        const finalChat = {
          ...updatedChat,
          messages: [...updatedChat.messages, { role: 'assistant', content: data.response }],
          updatedAt: new Date().toISOString()
        };

        setCurrentChat(finalChat);
        saveChat(finalChat);
      } catch (error) {
        console.error('Error sending message:', error);
        // Add error message to chat
        setCurrentChat({
          ...updatedChat,
          messages: [...updatedChat.messages, {
            role: 'assistant',
            content: 'Error: Could not connect to local Ollama instance. Make sure Ollama is running.'
          }],
          updatedAt: new Date().toISOString()
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle completion of streaming response
  const handleStreamingComplete = (assistantMessage: string) => {
    setIsStreaming(false);

    // Add both user and assistant messages to chat
    const updatedChat = {
      ...currentChat,
      messages: [
        ...currentChat.messages,
        { role: 'user', content: streamingUserMessage },
        { role: 'assistant', content: assistantMessage }
      ],
      updatedAt: new Date().toISOString()
    };

    setCurrentChat(updatedChat);
    saveChat(updatedChat);
    setStreamingUserMessage('');
  };

  const handleModelChange = (model: string) => {
    setCurrentChat({
      ...currentChat,
      model
    });
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: new Date().toISOString(),
      messages: [],
      model: currentChat.model, // Keep the same model
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCurrentChat(newChat);
    saveChat(newChat);
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (chat: Chat) => {
    setCurrentChat(chat);
    setIsSidebarOpen(false);
  };

  const { colors } = useThemeContext();

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-[var(--background)] transition-colors duration-200">
      {/* Conversation Sidebar */}
      <ConversationSidebar
        currentChatId={currentChat.id}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="w-full max-w-5xl flex flex-col h-screen">
        <header className="flex justify-between items-center mb-6 py-2">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-3 p-2 rounded-full hover:bg-[var(--border)] text-[var(--primaryText)]"
              aria-label="Open conversation sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <div className="flex items-center">
              <img src="/FlameOS_logo.png" alt="FlameOS Logo" className="h-8 mr-2" />
              <h1 className="text-2xl font-bold text-[var(--primaryText)]">LocoLama</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-52">
              <GPUMonitor />
            </div>
            <ThemeToggle />
            <ModelSelector
              selectedModel={currentChat.model}
              onModelChange={handleModelChange}
              showAdvancedOptions={true}
            />
          </div>
        </header>

        <ChatWindow
          messages={currentChat.messages}
          isLoading={isLoading}
          isStreaming={isStreaming}
          streamingUserMessage={streamingUserMessage}
          model={currentChat.model}
          onStreamingComplete={handleStreamingComplete}
        />

        <div className="mt-auto mb-4">
          <div className="flex gap-2 p-1 bg-[var(--cardBackground)] rounded-lg border border-[var(--border)] shadow-[var(--shadowMedium)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-4 text-[var(--primaryText)] bg-transparent border-none focus:ring-0 focus:outline-none"
              disabled={isLoading || isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isStreaming || !input.trim()}
              className="btn btn-primary px-6 shadow-sm"
            >
              {isLoading || isStreaming ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </div>
              ) : (
                <span>Send</span>
              )}
            </button>
          </div>

          <div className="flex flex-wrap justify-between items-center mt-3 gap-y-2">
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={handleNewChat}
                className="btn btn-ghost text-sm px-3 py-1 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Chat
              </button>

              <div className="flex items-center">
                <label htmlFor="streaming-toggle" className="text-sm text-[var(--secondaryText)] mr-2">
                  Streaming
                </label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    id="streaming-toggle"
                    type="checkbox"
                    checked={useStreaming}
                    onChange={() => setUseStreaming(!useStreaming)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="streaming-toggle"
                    className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <img src="/NODE_watermark.png" alt="NODE" className="h-6 mr-2 opacity-30" />
              <p className="text-xs text-[var(--tertiaryText)]">
                Powered by Ollama • Running 100% locally • No data leaves your device
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
