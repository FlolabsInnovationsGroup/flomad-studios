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

      // Apply enhanced sky-themed variables with smoother transitions
      if (isDark) {
        // Night sky theme - deep cosmic atmosphere
        bodyElement.style.backgroundColor = '#0f172a';
        bodyElement.style.color = '#f8fafc';
        
        // Add night-specific CSS properties
        bodyElement.style.setProperty('--sky-transition-duration', '0.8s');
        bodyElement.style.setProperty('--particle-visibility', '1');
        bodyElement.style.setProperty('--star-visibility', '1');
        bodyElement.style.setProperty('--day-particle-visibility', '0');

        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', '#0f172a');
      } else {
        // Day sky theme - realistic sky blue colors
        const hour = new Date().getHours();
        let bgColor = '#e0f2fe'; // Light sky blue
        let textColor = '#0c2340';
        
        // Subtle time-based variations
        if (hour >= 5 && hour < 8) {
          // Dawn - very subtle warm tint
          bgColor = '#f0f9ff';
          textColor = '#0c2340';
        } else if (hour >= 17 && hour < 20) {
          // Dusk - very subtle warm tint
          bgColor = '#f8fafc';
          textColor = '#0c2340';
        }
        
        bodyElement.style.backgroundColor = bgColor;
        bodyElement.style.color = textColor;
        
        // Add day-specific CSS properties
        bodyElement.style.setProperty('--sky-transition-duration', '0.6s');
        bodyElement.style.setProperty('--particle-visibility', '0');
        bodyElement.style.setProperty('--star-visibility', '0');
        bodyElement.style.setProperty('--day-particle-visibility', '1');

        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', bgColor);
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
      storageKey="flo-theme"
    >
      {children}
    </NextThemesProvider>
  );
} 
