'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme, ThemeMode, lightColors, darkColors, applyThemeVariables } from '../utils/theme';

// Create theme context
interface ThemeContextType {
  theme: ThemeMode;
  colors: typeof lightColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, colors, updateTheme } = useTheme();
  
  // Apply theme variables to CSS
  React.useEffect(() => {
    applyThemeVariables(colors);
  }, [colors]);
  
  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    updateTheme(newTheme);
  };
  
  // Set specific theme
  const setTheme = (newTheme: ThemeMode) => {
    updateTheme(newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
