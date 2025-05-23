/**
 * LocalStorage Manager for LocoLama
 * 
 * This module provides functions to store and retrieve chat history and settings
 * from the browser's localStorage.
 */

// Types
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  model: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  defaultModel: string;
  temperature: number;
  maxTokens: number;
  theme: 'light' | 'dark' | 'system';
}

// Constants
const CHATS_STORAGE_KEY = 'locolama-chats';
const SETTINGS_STORAGE_KEY = 'locolama-settings';

// Default settings
const DEFAULT_SETTINGS: Settings = {
  defaultModel: 'llama2',
  temperature: 0.7,
  maxTokens: 2048,
  theme: 'system',
};

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get all chats from localStorage
 */
export function getChats(): Chat[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const chatsJson = localStorage.getItem(CHATS_STORAGE_KEY);
    return chatsJson ? JSON.parse(chatsJson) : [];
  } catch (error) {
    console.error('Error getting chats from localStorage:', error);
    return [];
  }
}

/**
 * Get a specific chat by ID
 */
export function getChatById(chatId: string): Chat | null {
  const chats = getChats();
  return chats.find(chat => chat.id === chatId) || null;
}

/**
 * Save a chat to localStorage
 */
export function saveChat(chat: Chat): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    const chats = getChats();
    const existingChatIndex = chats.findIndex(c => c.id === chat.id);
    
    // Update the timestamps
    chat.updatedAt = new Date().toISOString();
    if (!chat.createdAt) {
      chat.createdAt = chat.updatedAt;
    }
    
    if (existingChatIndex >= 0) {
      // Update existing chat
      chats[existingChatIndex] = chat;
    } else {
      // Add new chat
      chats.push(chat);
    }
    
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error('Error saving chat to localStorage:', error);
  }
}

/**
 * Delete a chat from localStorage
 */
export function deleteChat(chatId: string): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    const chats = getChats();
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updatedChats));
  } catch (error) {
    console.error('Error deleting chat from localStorage:', error);
  }
}

/**
 * Clear all chats from localStorage
 */
export function clearAllChats(): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing chats from localStorage:', error);
  }
}

/**
 * Get settings from localStorage
 */
export function getSettings(): Settings {
  if (!isLocalStorageAvailable()) return DEFAULT_SETTINGS;
  
  try {
    const settingsJson = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return settingsJson 
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(settingsJson) } 
      : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error getting settings from localStorage:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: Partial<Settings>): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
}
