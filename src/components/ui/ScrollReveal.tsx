'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent SSR issues
  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  // Determine animation properties based on direction
  const getAnimationProps = () => {
    switch (direction) {
      case 'up':
        return { y: 40 };
      case 'down':
        return { y: -40 };
      case 'left':
        return { x: 40 };
      case 'right':
        return { x: -40 };
      default:
        return { scale: 0.95 };
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...getAnimationProps(),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      viewport={{ once: true, amount: threshold }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 