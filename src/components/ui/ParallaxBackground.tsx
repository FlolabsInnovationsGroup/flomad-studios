'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: number;
}

// Function to generate consistent random positions for floating elements
const generateRandomPositions = (count: number, seed = 42) => {
  // Simple pseudo-random number generator with seed
  const pseudoRandom = (seed: number) => {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  const random = pseudoRandom(seed);
  
  return Array.from({ length: count }).map(() => ({
    width: 50 + random() * 100,
    height: 50 + random() * 100,
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    opacity: 0.1 + random() * 0.2,
    animationDuration: 5 + random() * 10,
    xMovement: random() * 30 - 15,
    yMovement: random() * 30 - 15,
  }));
};

export default function ParallaxBackground({
  className = '',
  children,
  intensity = 0.2
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Generate positions with a fixed seed for consistency
  const [floatingElements] = useState(() => generateRandomPositions(10));
  
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 300 * intensity]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 200 * intensity]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100 * intensity]);
  
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    
    const handleResize = () => {
      // Window resize handling can be added here if needed
    };

    // Set initial size
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background Layer (Slowest) */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: springY1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 backdrop-blur-md" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
      </motion.div>
      
      {/* Middle Layer */}
      <motion.div 
        className="absolute inset-0 z-1"
        style={{ y: springY2 }}
      >
        <div className="absolute inset-0 line-grid opacity-20" />
        <div className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl -top-20 -left-20" />
        <div className="absolute w-96 h-96 rounded-full bg-secondary/10 blur-3xl -bottom-20 -right-20" />
      </motion.div>
      
      {/* Foreground Layer (Fastest) */}
      <motion.div 
        className="absolute inset-0 z-2"
        style={{ y: springY3 }}
      >
        {/* Only render floating elements on client side */}
        {isMounted && floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: element.width,
              height: element.height,
              left: element.left,
              top: element.top,
              opacity: element.opacity,
            }}
            animate={{
              x: [0, element.xMovement, 0],
              y: [0, element.yMovement, 0],
            }}
            transition={{
              duration: element.animationDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      
      {/* Content Container (Static relative to scroll) */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 