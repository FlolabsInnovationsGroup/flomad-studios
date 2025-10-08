'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show button when page is scrolled down significantly
  const toggleVisibility = () => {
    const scrolled = window.scrollY;
    const threshold = window.innerHeight * 1.2; // Show after scrolling past the first full screen
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    
    // Don't show if near bottom of page or if page is too short
    const nearBottom = scrolled + windowHeight >= documentHeight - 100;
    const pageIsTooShort = documentHeight < windowHeight * 2;
    
    if (scrolled > threshold && !nearBottom && !pageIsTooShort) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener with throttling
  useEffect(() => {
    if (!isMounted) return;
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="scroll-component fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 text-foreground backdrop-blur-md cursor-pointer md:cursor-none border border-white/20 dark:border-white/10 transition-all duration-300 shadow-lg"
          aria-label="Scroll to top"
          data-cursor-text="Top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
} 
