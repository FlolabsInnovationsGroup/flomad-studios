'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  mode?: 'fade' | 'slide' | 'scale' | 'none';
}

export default function PageTransition({ 
  children
}: PageTransitionProps) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 