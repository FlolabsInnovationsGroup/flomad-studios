'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Function to generate professional sky-themed background elements
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
      className: 'floating-sky-primary',
      width: 500,
      height: 500,
      top: `${random() * 15 + 5}%`,
      left: `${random() * 25 + 10}%`,
      background: 'radial-gradient(circle at center, rgba(3, 105, 161, 0.08) 0%, transparent 70%)',
      darkBackground: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 45,
    },
    {
      className: 'floating-sky-secondary',
      width: 350,
      height: 350,
      bottom: `${random() * 20 + 10}%`,
      right: `${random() * 30 + 15}%`,
      background: 'radial-gradient(circle at center, rgba(8, 145, 178, 0.06) 0%, transparent 70%)',
      darkBackground: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 50,
      animationDirection: 'reverse',
    },
    {
      className: 'floating-sky-clouds',
      width: 400,
      height: 200,
      top: `${random() * 30 + 20}%`,
      right: `${random() * 40 + 5}%`,
      background: 'radial-gradient(ellipse 100% 50% at center, rgba(255, 255, 255, 0.3) 0%, transparent 80%)',
      darkBackground: 'radial-gradient(ellipse 100% 50% at center, rgba(139, 92, 246, 0.05) 0%, transparent 80%)',
      animationName: 'floatOrganic',
      animationDuration: 55,
      animationDelay: 10,
    },
    {
      className: 'floating-sky-accent',
      width: 280,
      height: 280,
      bottom: `${random() * 35 + 30}%`,
      left: `${random() * 20 + 70}%`,
      background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
      darkBackground: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.06) 0%, transparent 70%)',
      animationName: 'floatOrganic',
      animationDuration: 40,
      animationDelay: 5,
    }
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
        <div className="sky-atmosphere"></div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 z-[-20] pointer-events-none overflow-hidden">
      {/* Primary atmospheric layers */}
      <div className="mesh-gradient"></div>
      <div className="sky-atmosphere"></div>
      
      {/* Enhanced floating elements with theme-aware backgrounds */}
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
            animationName: element.animationName,
            animationDuration: `${element.animationDuration}s`,
            animationDirection: 'animationDirection' in element ? element.animationDirection : undefined,
            animationDelay: 'animationDelay' in element ? `${element.animationDelay}s` : undefined,
          }}
        />
      ))}
      
      {/* Additional sky layer for depth */}
      <div className="sky-depth-layer" />
    </div>
  );
} 