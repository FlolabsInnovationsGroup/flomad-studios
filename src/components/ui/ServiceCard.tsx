"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Palette, Code, Play, ArrowRight, Circle, 
  PenTool, Globe, Film, Smartphone, Headphones, 
  Volume2, Megaphone, Users, BarChart2
} from 'lucide-react';
import { motion } from 'framer-motion';

// Map of icon names to components
const iconMap = {
  Palette,
  Code,
  Play,
  Circle,
  PenTool,
  Globe,
  Film,
  Smartphone,
  Headphones,
  Volume2,
  Megaphone,
  Users,
  BarChart2
};

type IconName = keyof typeof iconMap;

export interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  colorScheme?: 'primary' | 'secondary' | 'accent' | string;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  iconName,
  colorScheme = 'primary',
  className,
}: ServiceCardProps) {
  // Map color schemes to gradients, border colors, text colors, and shadow colors
  const colorSchemes = {
    primary: {
      gradient: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--primary-rgb), 0) 100%)`,
      iconBg: `rgba(var(--primary-rgb), 0.15)`,
      border: `rgba(var(--primary-rgb), 0.15)`,
      textColor: `rgb(var(--primary-rgb))`,
      shadow: `rgba(var(--primary-rgb), 0.2)`,
    },
    secondary: {
      gradient: `linear-gradient(135deg, rgba(var(--secondary-rgb), 0.15) 0%, rgba(var(--secondary-rgb), 0) 100%)`,
      iconBg: `rgba(var(--secondary-rgb), 0.15)`,
      border: `rgba(var(--secondary-rgb), 0.15)`,
      textColor: `rgb(var(--secondary-rgb))`,
      shadow: `rgba(var(--secondary-rgb), 0.2)`,
    },
    accent: {
      gradient: `linear-gradient(135deg, rgba(var(--accent-rgb), 0.15) 0%, rgba(var(--accent-rgb), 0) 100%)`,
      iconBg: `rgba(var(--accent-rgb), 0.15)`,
      border: `rgba(var(--accent-rgb), 0.15)`,
      textColor: `rgb(var(--accent-rgb))`,
      shadow: `rgba(var(--accent-rgb), 0.2)`,
    },
  };

  const { gradient, iconBg, border, textColor, shadow } = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.primary;
  
  // Get the icon component, default to Circle if not found
  const IconComponent = iconMap[iconName as IconName] || Circle;

  return (
    <motion.div
      className={cn(
        'service-card p-6 rounded-3xl relative overflow-hidden flex flex-col space-y-4',
        className
      )}
      initial={{ boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.1), 0 0 10px ${shadow}` }}
      whileHover={{ 
        y: -10,
        boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.2), 0 0 20px ${shadow}`,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      style={{ 
        background: `rgba(var(--card-rgb), 0.05)`,
        borderColor: border,
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 z-0"
        style={{ background: gradient }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
      />
      
      <motion.div 
        className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
        whileHover={{ 
          rotate: [0, -10, 10, -5, 5, 0],
          transition: { 
            duration: 0.8,
            ease: "easeInOut" 
          }
        }}
      >
        <IconComponent className="w-8 h-8" style={{ color: textColor }} />
      </motion.div>
      
      <motion.h3 
        className="text-xl font-bold relative z-10"
        initial={{ y: 0 }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-foreground/80 relative z-10"
        initial={{ y: 0 }}
        whileHover={{ y: -2, transition: { duration: 0.2, delay: 0.05 } }}
      >
        {description}
      </motion.p>
      
      <motion.div 
        className="flex items-center text-sm font-medium mt-2 relative z-10"
        style={{ color: textColor }}
        initial={{ x: 0 }}
        whileHover={{ x: 5, transition: { duration: 0.2, delay: 0.1 } }}
      >
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </motion.div>
    </motion.div>
  );
} 