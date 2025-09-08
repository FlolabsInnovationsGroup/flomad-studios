"use client";

import React, { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  scale = 1.05,
  speed = 400,
  perspective = 1000,
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate the tilt based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate tilt values (negative to match natural tilt direction)
    const tiltX = -((y / rect.height - 0.5) * maxTilt);
    const tiltY = (x / rect.width - 0.5) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
  };

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  // Set hovering state
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovering ? scale : 1,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 300,
        duration: speed / 1000,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: perspective,
        transformPerspective: perspective,
      }}
    >
      {/* Content layer - lifted up for 3D effect */}
      <motion.div
        animate={{
          z: isHovering ? 50 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 pointer-events-none"
        animate={{
          opacity: isHovering ? 0.1 : 0,
          rotateX: -tilt.x * 1.5, // Inverted to create light effect
          rotateY: -tilt.y * 1.5, // Inverted to create light effect
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
      />
    </motion.div>
  );
} 