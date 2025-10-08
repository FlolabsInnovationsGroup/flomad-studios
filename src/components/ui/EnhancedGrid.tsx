'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedGridProps extends HTMLMotionProps<'div'> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  staggered?: boolean;
  hover3d?: boolean;
  children: React.ReactNode;
}

interface GridItemProps extends HTMLMotionProps<'div'> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
  featured?: boolean;
  interactive?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export function EnhancedGrid({
  columns = 3,
  gap = 'md',
  responsive = true,
  staggered = true,
  hover3d = false,
  children,
  className,
  ...props
}: EnhancedGridProps) {
  const getColumnClass = () => {
    if (responsive) {
      switch (columns) {
        case 1: return 'grid-cols-1';
        case 2: return 'grid-cols-1 sm:grid-cols-2';
        case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
        case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        case 5: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';
        case 6: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
        default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      }
    }
    return `grid-cols-${columns}`;
  };

  const getGapClass = () => {
    switch (gap) {
      case 'sm': return 'gap-4';
      case 'md': return 'gap-6';
      case 'lg': return 'gap-8';
      case 'xl': return 'gap-12';
      default: return 'gap-6';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: staggered ? {
        staggerChildren: 0.1,
        delayChildren: 0.2
      } : { duration: 0.6 }
    }
  };

  return (
    <motion.div
      className={cn(
        'grid',
        getColumnClass(),
        getGapClass(),
        hover3d && 'perspective-1000',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GridItem({
  span = 1,
  featured = false,
  interactive = true,
  glow = false,
  children,
  className,
  ...props
}: GridItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const getSpanClass = () => {
    if (span === 'full') return 'col-span-full';
    return `col-span-1 sm:col-span-${Math.min(span, 2)} lg:col-span-${span}`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <motion.div
      className={cn(
        'relative group',
        getSpanClass(),
        featured && 'lg:col-span-2 lg:row-span-2',
        className
      )}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      animate={interactive ? {
        rotateX: rotateX,
        rotateY: rotateY
      } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {/* Glow effect */}
      {glow && isHovered && (
        <motion.div
          className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-sky-400/20 to-blue-500/20 blur-xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content container */}
      <motion.div
        className={cn(
          'h-full rounded-xl bg-white/80 dark:bg-black/5 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300',
          interactive && 'hover:bg-white/90 dark:hover:bg-black/10 hover:border-gray-300/50 dark:hover:border-gray-700/50',
          featured && 'bg-gradient-to-br from-sky-50/80 to-blue-50/60 dark:from-sky-950/20 dark:to-blue-950/10'
        )}
        animate={interactive ? {
          z: isHovered ? 20 : 0
        } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Specialized grid layouts
export function MasonryGrid({ 
  children, 
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGrid({ 
  children, 
  className,
  ...props 
}: EnhancedGridProps) {
  return (
    <EnhancedGrid
      columns={4}
      gap="md"
      responsive
      staggered
      hover3d
      className={cn('auto-rows-fr', className)}
      {...props}
    >
      {children}
    </EnhancedGrid>
  );
}

export function PortfolioGrid({ 
  children, 
  className,
  ...props 
}: EnhancedGridProps) {
  return (
    <EnhancedGrid
      columns={3}
      gap="lg"
      responsive
      staggered
      hover3d
      className={className}
      {...props}
    >
      {children}
    </EnhancedGrid>
  );
}

// Grid item variants
export function FeatureCard({ 
  title, 
  description, 
  icon, 
  ...props 
}: Omit<GridItemProps, 'children'> & {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <GridItem interactive glow {...props}>
      <div className="p-6 h-full flex flex-col">
        {icon && (
          <div className="mb-4 text-sky-600 dark:text-sky-400">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
        <p className="text-gray-700 dark:text-white/70 leading-relaxed flex-1">{description}</p>
      </div>
    </GridItem>
  );
}

export function StatCard({ 
  value, 
  label, 
  trend, 
  ...props 
}: Omit<GridItemProps, 'children'> & {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <GridItem interactive {...props}>
      <div className="p-6 h-full flex flex-col justify-center text-center">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
        <div className="text-gray-600 dark:text-white/60 text-sm">{label}</div>
        {trend && (
          <div className={cn(
            'text-xs mt-2',
            trend === 'up' && 'text-green-400',
            trend === 'down' && 'text-red-400',
            trend === 'neutral' && 'text-yellow-400'
          )}>
            {trend === 'up' && '↗ Trending up'}
            {trend === 'down' && '↘ Trending down'}
            {trend === 'neutral' && '→ Stable'}
          </div>
        )}
      </div>
    </GridItem>
  );
}