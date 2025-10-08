'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredItemsProps {
  children: ReactNode[];
  className?: string;
  containerTag?: 'div' | 'ul' | 'ol';
  itemTag?: 'div' | 'li';
  staggerDelay?: number;
  duration?: number;
  startDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function StaggeredItems({
  children,
  className = '',
  containerTag = 'div',
  itemTag = 'div',
  staggerDelay = 0.1,
  duration = 0.5,
  startDelay = 0,
  direction = 'up',
}: StaggeredItemsProps) {
  // Determine animation properties based on direction
  const getAnimationProps = () => {
    switch (direction) {
      case 'up':
        return { y: 20 };
      case 'down':
        return { y: -20 };
      case 'left':
        return { x: 20 };
      case 'right':
        return { x: -20 };
      default:
        return { scale: 0.98 };
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: startDelay,
      },
    },
  };

  const item = {
    hidden: { 
      opacity: 0,
      ...getAnimationProps(),
    },
    show: { 
      opacity: 1, 
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
      }
    },
  };

  // Create motion components with proper typing
  const MotionContainer = containerTag === 'ul' ? motion.ul : containerTag === 'ol' ? motion.ol : motion.div;
  const MotionItem = itemTag === 'li' ? motion.li : motion.div;

  return (
    <MotionContainer
      variants={container}
      initial="show"
      animate="show"
      className={className}
    >
      {children.map((child, index) => (
        <MotionItem key={index} variants={item}>
          {child}
        </MotionItem>
      ))}
    </MotionContainer>
  );
} 
