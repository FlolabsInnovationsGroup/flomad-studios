'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
  magneticHover?: boolean;
  glowOnHover?: boolean;
  variant?: 'default' | 'premium' | 'interactive';
}

export default function EnhancedCard({ 
  children, 
  className, 
  hover3D = false,
  magneticHover = false,
  glowOnHover = true,
  variant = 'default'
}: EnhancedCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const cardVariants = {
    default: { 
      rotateX: 0, 
      rotateY: 0,
      scale: 1,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      rotateX: hover3D ? mousePosition.y * 0.1 : 0,
      rotateY: hover3D ? mousePosition.x * 0.1 : 0,
      scale: 1.02,
      boxShadow: glowOnHover 
        ? "0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)" 
        : "0 20px 40px -8px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.1)"
    }
  };

  const baseClasses = {
    default: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/40",
    premium: "bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/70 backdrop-blur-2xl border-2 border-gradient-to-r from-blue-500/20 to-purple-500/20",
    interactive: "bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 cursor-pointer"
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl transition-all duration-300",
        baseClasses[variant],
        magneticHover && "transform-gpu",
        className
      )}
      variants={cardVariants}
      initial="default"
      whileHover="hover"
      animate={isHovering ? "hover" : "default"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      {children}
      
      {/* Enhanced glow effect */}
      {glowOnHover && isHovering && (
        <motion.div 
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
}