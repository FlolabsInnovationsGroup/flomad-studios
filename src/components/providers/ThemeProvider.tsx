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
        bodyElement.style.backgroundColor = '#0f172a';
        bodyElement.style.color = '#f8fafc';

        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#0f172a');
      } else {
        // Day sky theme - professional atmospheric clarity
        bodyElement.style.backgroundColor = '#edf6ff';
        bodyElement.style.color = '#10223a';

        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#edf6ff');
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
