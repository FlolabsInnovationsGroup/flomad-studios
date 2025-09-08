'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  mode?: 'fade' | 'slide' | 'scale' | 'none';
}

export default function PageTransition({ 
  children,
  mode = 'fade'
}: PageTransitionProps) {
  const pathname = usePathname();
  
  // Determine animation mode based on route patterns
  const animationMode = useMemo(() => {
    if (mode !== 'none') {
      return mode;
    }
    
    // Can add route-specific animations here
    if (pathname.startsWith('/work')) {
      return 'scale';
    } else if (pathname.startsWith('/services')) {
      return 'slide';
    }
    
    // Default
    return 'fade';
  }, [pathname, mode]);
  
  // Animation variants based on mode
  const variants = useMemo(() => {
    switch (animationMode) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1, 
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          },
          exit: { 
            opacity: 0, 
            transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'slide':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          },
          exit: { 
            opacity: 0, 
            x: -20,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.98 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          },
          exit: { 
            opacity: 0, 
            scale: 1.02,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }
        };
      default:
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 }
        };
    }
  }, [animationMode]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 