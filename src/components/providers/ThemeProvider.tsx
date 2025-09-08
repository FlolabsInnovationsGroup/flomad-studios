'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Enhanced theme application system
  useEffect(() => {
    const applyThemeStyles = () => {
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      const isDark = htmlElement.classList.contains('dark');
      
      // Apply smooth transitions
      if (!bodyElement.style.transition) {
        bodyElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        htmlElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      }
      
      // Apply theme-specific root variables
      if (isDark) {
        // Dark mode enhanced styling
        bodyElement.style.backgroundColor = 'rgb(15, 23, 42)'; // slate-900
        bodyElement.style.color = 'rgb(248, 250, 252)'; // slate-50
        
        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#0f172a');
        
        // Enhanced dark mode CSS variables
        htmlElement.style.setProperty('--backdrop-opacity', '0.95');
        htmlElement.style.setProperty('--glass-opacity', '0.1');
        htmlElement.style.setProperty('--shadow-strength', '0.3');
        htmlElement.style.setProperty('--border-opacity', '0.1');
      } else {
        // Light mode enhanced styling
        bodyElement.style.backgroundColor = 'rgb(248, 250, 252)'; // slate-50
        bodyElement.style.color = 'rgb(15, 23, 42)'; // slate-900
        
        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#f8fafc');
        
        // Enhanced light mode CSS variables
        htmlElement.style.setProperty('--backdrop-opacity', '0.8');
        htmlElement.style.setProperty('--glass-opacity', '0.05');
        htmlElement.style.setProperty('--shadow-strength', '0.1');
        htmlElement.style.setProperty('--border-opacity', '0.2');
      }
      
      // Force re-render of glass elements by triggering a reflow
      const glassElements = document.querySelectorAll('.glass, .glass-subtle, .glass-elevated');
      glassElements.forEach(element => {
        (element as HTMLElement).style.transform = 'translateZ(0)';
      });
    };

    // Apply initial styles
    applyThemeStyles();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' && 
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          // Small delay to ensure theme has been applied
          setTimeout(applyThemeStyles, 10);
        }
      });
    });

    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
      themes={['light', 'dark']}
      storageKey="flomad-theme"
    >
      {children}
    </NextThemesProvider>
  );
} 