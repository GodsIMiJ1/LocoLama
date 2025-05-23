import { useState, useEffect } from 'react';
import { Chat, getChats, deleteChat } from '../utils/storage';

interface ConversationSidebarProps {
  currentChatId: string;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConversationSidebar({
  currentChatId,
  onSelectChat,
  onNewChat,
  isOpen,
  onClose
}: ConversationSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load chats from localStorage
  useEffect(() => {
    const loadedChats = getChats();
    // Sort chats by updatedAt (most recent first)
    loadedChats.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setChats(loadedChats);
  }, [currentChatId]); // Reload when currentChatId changes

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => {
    const firstMessage = chat.messages[0]?.content || '';
    return firstMessage.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle chat deletion
  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this conversation?')) {
      deleteChat(chatId);
      setChats(chats.filter(chat => chat.id !== chatId));
    }
  };

  // Get chat preview text (first user message)
  const getChatPreview = (chat: Chat): string => {
    const firstUserMessage = chat.messages.find(msg => msg.role === 'user');
    if (!firstUserMessage) return 'New conversation';

    // Truncate long messages
    const preview = firstUserMessage.content;
    return preview.length > 60 ? `${preview.substring(0, 60)}...` : preview;
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[var(--overlay)] z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-80 sidebar shadow-[var(--shadowLarge)] transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-30 flex flex-col`}>
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
          <div className="flex items-center">
            <img src="/FlameOS_logo.png" alt="FlameOS Logo" className="h-6 mr-2" />
            <h2 className="text-xl font-semibold text-[var(--primaryText)]">Conversations</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--secondaryText)] hover:text-[var(--primaryText)] p-1 rounded-full hover:bg-[var(--border)]"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input w-full pl-9"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--tertiaryText)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-[var(--border)]">
          <button
            onClick={onNewChat}
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredChats.length === 0 ? (
            <div className="p-6 text-center text-[var(--secondaryText)]">
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </div>
          ) : (
            filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className={`p-3 border-b border-[var(--border)] cursor-pointer hover:bg-[var(--border)] transition-colors ${
                  chat.id === currentChatId
                    ? 'bg-[var(--border)] border-l-4 border-l-[var(--primary)] shadow-inner'
                    : 'hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-[var(--primaryText)]">{getChatPreview(chat)}</p>
                    <div className="flex items-center mt-1 text-xs text-[var(--tertiaryText)]">
                      <span className="mr-2">{formatDate(chat.updatedAt)}</span>
                      <span className="px-2 py-1 bg-[var(--cardBackground)] rounded-full border border-[var(--border)] shadow-sm">{chat.model}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="ml-2 text-[var(--tertiaryText)] hover:text-[var(--error)] p-1 rounded-full hover:bg-[var(--border)]"
                    aria-label="Delete conversation"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[var(--border)] bg-[var(--cardBackground)]">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--tertiaryText)]">{chats.length} conversation{chats.length !== 1 ? 's' : ''}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to export all conversations? This will download a JSON file.')) {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chats));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    downloadAnchorNode.setAttribute("download", "locolama-chats.json");
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                  }
                }}
                className="text-xs text-[var(--primary)] hover:text-[var(--primaryHover)] font-medium"
              >
                Export All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
