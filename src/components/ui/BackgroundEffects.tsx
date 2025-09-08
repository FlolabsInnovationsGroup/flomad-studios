'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Function to generate enhanced background elements with better visibility
const generateBackgroundElements = (seed = 42) => {
  // Simple pseudo-random number generator with seed
  const pseudoRandom = (seed: number) => {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  const random = pseudoRandom(seed);
  
  return [
    {
      className: 'floating-purple',
      width: 600,
      height: 600,
      top: `${random() * 15 - 10}%`,
      left: `${random() * 25 + 5}%`,
      background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.35) 0%, rgba(139, 92, 246, 0.25) 40%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 25,
    },
    {
      className: 'floating-teal',
      width: 700,
      height: 700,
      top: `${random() * 30 + 15}%`,
      right: `${random() * 20 - 15}%`,
      background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, rgba(14, 165, 233, 0.2) 40%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 30,
      animationDirection: 'reverse',
    },
    {
      className: 'floating-magenta',
      width: 500,
      height: 500,
      bottom: `${random() * 20 + 5}%`,
      left: `${random() * 30 + 10}%`,
      background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.3) 0%, rgba(219, 39, 119, 0.2) 40%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 35,
    },
    {
      className: 'floating-amber',
      width: 450,
      height: 450,
      top: `${random() * 25 + 50}%`,
      right: `${random() * 25 + 30}%`,
      background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.25) 0%, rgba(251, 191, 36, 0.15) 40%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 28,
    },
    {
      className: 'floating-emerald',
      width: 380,
      height: 380,
      bottom: `${random() * 15 + 30}%`,
      right: `${random() * 20 + 5}%`,
      background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.25) 0%, rgba(34, 197, 94, 0.15) 40%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 32,
      animationDirection: 'reverse',
    },
  ];
};

export default function BackgroundEffects() {
  const [isMounted, setIsMounted] = useState(false);
  const [backgroundElements] = useState(() => generateBackgroundElements());
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[-20] pointer-events-none">
        <div className="mesh-gradient"></div>
        <div className="glowing-dots"></div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-[-20] pointer-events-none">
      <div className="mesh-gradient"></div>
      <div className="glowing-dots"></div>
      
      {backgroundElements.map((element, index) => (
        <motion.div 
          key={index}
          className={`floating-element ${element.className}`}
          style={{
            width: `${element.width}px`,
            height: `${element.height}px`,
            top: element.top,
            left: element.left,
            right: 'right' in element ? element.right : undefined,
            bottom: 'bottom' in element ? element.bottom : undefined,
            background: element.background,
            animationName: element.animationName,
            animationDuration: `${element.animationDuration}s`,
            animationDirection: 'animationDirection' in element ? element.animationDirection : undefined,
            transition: 'opacity 0.5s ease, filter 0.5s ease'
          }}
        />
      ))}
    </div>
  );
} 