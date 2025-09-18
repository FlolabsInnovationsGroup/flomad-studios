'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorTrackerProps {
  defaultText?: string;
}

export default function CursorTracker({ 
  defaultText = 'Scroll' 
}: CursorTrackerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState(defaultText);
  const mouseRef = useRef({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  };

  const onMouseEnter = () => {
    setIsVisible(true);
  };

  const onMouseLeave = () => {
    setIsVisible(false);
  };

  // Track interactive elements
  const setupInteractiveElements = () => {
    // Buttons: View, Learn More, etc.
    const buttons = document.querySelectorAll('button:not(.no-cursor-text), .button-like');
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        const text = button.getAttribute('data-cursor-text') || 'Click';
        setCursorText(text);
      });
      button.addEventListener('mouseleave', () => {
        setCursorText(defaultText);
      });
    });

    // Links
    const links = document.querySelectorAll('a:not(.no-cursor-text)');
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        const text = link.getAttribute('data-cursor-text') || 'View';
        setCursorText(text);
      });
      link.addEventListener('mouseleave', () => {
        setCursorText(defaultText);
      });
    });

    // Cards with tilt effect
    const tiltCards = document.querySelectorAll('.tilt-card:not(.no-cursor-text)');
    tiltCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        const text = card.getAttribute('data-cursor-text') || 'Explore';
        setCursorText(text);
      });
      card.addEventListener('mouseleave', () => {
        setCursorText(defaultText);
      });
    });

    // Anything with custom cursor text
    const customElements = document.querySelectorAll('[data-cursor-text]:not(.no-cursor-text)');
    customElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        const text = element.getAttribute('data-cursor-text') || defaultText;
        setCursorText(text);
      });
      element.addEventListener('mouseleave', () => {
        setCursorText(defaultText);
      });
    });
  };

  const cleanupInteractiveElements = () => {
    const elements = document.querySelectorAll('button, a, .tilt-card, [data-cursor-text]');
    elements.forEach((element) => {
      element.removeEventListener('mouseenter', () => {});
      element.removeEventListener('mouseleave', () => {});
    });
  };

  useEffect(() => {
    // Add listeners for mouse movements
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    
    // Set up interactive elements
    setupInteractiveElements();

    // Animation loop for smooth movement
    let animationFrameId: number;
    const animateCursor = () => {
      setMousePosition(prevPosition => {
        return {
          x: prevPosition.x + (mouseRef.current.x - prevPosition.x) * 0.15,
          y: prevPosition.y + (mouseRef.current.y - prevPosition.y) * 0.15
        };
      });
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    animationFrameId = requestAnimationFrame(animateCursor);

    // Update interactive elements when DOM changes
    const observer = new MutationObserver(() => {
      cleanupInteractiveElements();
      setupInteractiveElements();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cleanupInteractiveElements();
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultText]);

  return (
    <AnimatePresence>
      {isVisible && cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: mousePosition.x,
            y: mousePosition.y + 40
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed pointer-events-none z-[9998] text-xs uppercase font-semibold tracking-widest"
          style={{
            transform: `translate(-50%, -50%)`,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          <motion.div 
            className="bg-heading/90 dark:bg-background-muted/80 text-background dark:text-foreground px-3 py-1 rounded-full backdrop-blur-sm"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {cursorText}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
