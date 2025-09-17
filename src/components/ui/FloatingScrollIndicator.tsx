'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingScrollIndicatorProps {
  targetPosition?: number;
  hideAfterScroll?: boolean;
}

export default function FloatingScrollIndicator({
  targetPosition,
  hideAfterScroll = true
}: FloatingScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !hideAfterScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.5; // Hide after scrolling 50% of viewport
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Hide if scrolled past threshold, near bottom, or page is too short
      const nearBottom = scrolled + windowHeight >= documentHeight - 200;
      const pageIsTooShort = documentHeight < windowHeight * 1.5;

      if (scrolled > threshold || nearBottom || pageIsTooShort) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, hideAfterScroll]);

  const handleClick = () => {
    const scrollTarget = targetPosition || window.innerHeight;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="scroll-component fixed bottom-8 left-6 z-30 md:left-6 sm:left-4"
        >
          <motion.div
            className="flex flex-col items-center space-y-2 group cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-foreground/30 dark:border-foreground/20 rounded-full flex justify-center relative overflow-hidden group-hover:border-primary transition-colors duration-300"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-2 bg-gradient-to-b from-primary to-primary/50 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.span
              className="text-xs text-foreground/60 dark:text-foreground/50 font-medium tracking-wide"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              Scroll
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
