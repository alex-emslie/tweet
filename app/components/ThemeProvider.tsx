'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Check localStorage first
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme) {
          setTheme(storedTheme);
          document.documentElement.classList.add(storedTheme);
          document.documentElement.setAttribute('data-theme', storedTheme);
        } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const initialTheme = prefersDark ? 'dark' : 'light';
          setTheme(initialTheme);
          document.documentElement.classList.add(initialTheme);
          document.documentElement.setAttribute('data-theme', initialTheme);
          localStorage.setItem('theme', initialTheme);
        }
      } catch (error) {
        console.error('Error initializing theme:', error);
      }
      setMounted(true);
    };

    initializeTheme();
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;

    try {
      // Update localStorage
      localStorage.setItem('theme', theme);
      
      // Update document classes
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      
      // Update data-theme attribute
      document.documentElement.setAttribute('data-theme', theme);
      
      // Force a reflow
      document.documentElement.offsetHeight;
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 