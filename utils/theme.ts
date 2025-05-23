/**
 * Theme utilities for LocoLama
 * Provides theme management and color schemes
 */

import { useState, useEffect } from 'react';

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

// Color schemes
export const lightColors = {
  // Background colors
  background: '#f8fafc',
  cardBackground: '#ffffff',
  sidebarBackground: '#f1f5f9',
  
  // Text colors
  primaryText: '#0f172a',
  secondaryText: '#64748b',
  tertiaryText: '#94a3b8',
  
  // UI element colors
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  secondary: '#64748b',
  secondaryHover: '#475569',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  
  // Border colors
  border: '#e2e8f0',
  borderHover: '#cbd5e1',
  
  // Message bubble colors
  userBubble: '#3b82f6',
  userBubbleText: '#ffffff',
  assistantBubble: '#f1f5f9',
  assistantBubbleText: '#0f172a',
  
  // Misc
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const darkColors = {
  // Background colors
  background: '#0f172a',
  cardBackground: '#1e293b',
  sidebarBackground: '#0f172a',
  
  // Text colors
  primaryText: '#f8fafc',
  secondaryText: '#cbd5e1',
  tertiaryText: '#94a3b8',
  
  // UI element colors
  primary: '#3b82f6',
  primaryHover: '#60a5fa',
  secondary: '#64748b',
  secondaryHover: '#94a3b8',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  
  // Border colors
  border: '#334155',
  borderHover: '#475569',
  
  // Message bubble colors
  userBubble: '#3b82f6',
  userBubbleText: '#ffffff',
  assistantBubble: '#334155',
  assistantBubbleText: '#f8fafc',
  
  // Misc
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

// Hook to manage theme
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [colors, setColors] = useState(lightColors);
  
  // Function to update theme
  const updateTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('locolama-theme', newTheme);
    
    if (newTheme === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColors(isDarkMode ? darkColors : lightColors);
      document.documentElement.classList.toggle('dark', isDarkMode);
    } else {
      setColors(newTheme === 'dark' ? darkColors : lightColors);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('locolama-theme') as ThemeMode | null;
    
    if (savedTheme) {
      updateTheme(savedTheme);
    } else {
      // Use system preference
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColors(isDarkMode ? darkColors : lightColors);
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setColors(e.matches ? darkColors : lightColors);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  return { theme, colors, updateTheme };
}

// CSS variables for theme
export function applyThemeVariables(colors: typeof lightColors) {
  const root = document.documentElement;
  
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

// Helper to generate CSS classes for themed elements
export function generateThemeClasses() {
  return {
    app: 'bg-[var(--background)] text-[var(--primaryText)] min-h-screen transition-colors duration-200',
    card: 'bg-[var(--cardBackground)] shadow-[var(--shadow)] rounded-lg border border-[var(--border)]',
    sidebar: 'bg-[var(--sidebarBackground)] border-r border-[var(--border)]',
    primaryButton: 'bg-[var(--primary)] hover:bg-[var(--primaryHover)] text-white rounded-lg transition-colors',
    secondaryButton: 'bg-[var(--secondary)] hover:bg-[var(--secondaryHover)] text-white rounded-lg transition-colors',
    input: 'bg-[var(--cardBackground)] border border-[var(--border)] focus:border-[var(--primary)] text-[var(--primaryText)] rounded-lg transition-colors',
    userMessage: 'bg-[var(--userBubble)] text-[var(--userBubbleText)] rounded-lg rounded-br-none',
    assistantMessage: 'bg-[var(--assistantBubble)] text-[var(--assistantBubbleText)] rounded-lg rounded-bl-none',
  };
}
