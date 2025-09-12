'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  text?: string;
  targetPosition?: number;
  hideAfterScroll?: boolean;
}

export default function ScrollIndicator({ 
  text = "Discover Our Services", 
  targetPosition,
  hideAfterScroll = true
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted || !hideAfterScroll) return;
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.15; // Hide after scrolling 15% of viewport
      
      if (scrolled > threshold) {
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
    return (
      <div className="flex justify-center mt-8 mb-4">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-sm text-foreground/70 uppercase tracking-wider font-medium">
            {text}
          </span>
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8 mb-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4 group cursor-pointer" 
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="text-sm text-foreground/70 uppercase tracking-wider font-medium group-hover:text-primary transition-colors duration-300"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {text}
            </motion.span>
            <div className="relative">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
              </motion.div>
              <motion.div 
                className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
