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
      
      // Apply sky-themed variables
      if (isDark) {
        // Night sky theme - deep cosmic atmosphere
        bodyElement.style.backgroundColor = 'rgb(15, 23, 42)'; // Deep night sky
        bodyElement.style.color = 'rgb(248, 250, 252)'; // Crisp starlight
        
        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#0f172a');
        
        // Night sky CSS variables
        htmlElement.style.setProperty('--backdrop-opacity', '0.6');
        htmlElement.style.setProperty('--glass-opacity', '0.4');
        htmlElement.style.setProperty('--shadow-strength', '0.5');
        htmlElement.style.setProperty('--border-opacity', '0.12');
        htmlElement.style.setProperty('--sky-glow', 'rgba(79, 70, 229, 0.1)');
        htmlElement.style.setProperty('--cosmic-glow', 'rgba(99, 102, 241, 0.05)');
      } else {
        // Day sky theme - professional atmospheric clarity
        bodyElement.style.backgroundColor = 'rgb(248, 250, 252)'; // Soft day sky slate
        bodyElement.style.color = 'rgb(15, 23, 42)'; // Deep readable text
        
        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#f8fafc');
        
        // Day sky CSS variables - professional and atmospheric
        htmlElement.style.setProperty('--backdrop-opacity', '0.95');
        htmlElement.style.setProperty('--glass-opacity', '0.98');
        htmlElement.style.setProperty('--shadow-strength', '0.06');
        htmlElement.style.setProperty('--border-opacity', '0.12');
        htmlElement.style.setProperty('--sky-glow', 'rgba(14, 165, 233, 0.04)');
        htmlElement.style.setProperty('--text-contrast', '0 1px 3px rgba(255, 255, 255, 0.9)');
        htmlElement.style.setProperty('--sky-atmosphere', 'rgba(147, 197, 253, 0.03)');
        htmlElement.style.setProperty('--cloud-white', 'rgba(255, 255, 255, 0.8)');
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