'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  type?: 'simple' | 'detailed' | 'chart';
  children?: React.ReactNode;
  className?: string;
}

interface DetailedMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  gradient = 'blue',
  children,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate number counting
  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 30;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          current = value;
          clearInterval(timer);
        }
        setAnimatedValue(Math.floor(current));
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value]);

  const gradients = {
    blue: 'from-blue-500/20 via-blue-600/10 to-cyan-500/20',
    purple: 'from-purple-500/20 via-purple-600/10 to-pink-500/20',
    green: 'from-green-500/20 via-emerald-600/10 to-teal-500/20',
    orange: 'from-orange-500/20 via-amber-600/10 to-yellow-500/20',
    pink: 'from-pink-500/20 via-rose-600/10 to-red-500/20',
  };

  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  const displayValue = typeof value === 'number' ? animatedValue : value;

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6',
        'bg-black/20 backdrop-blur-xl border border-white/10',
        'transition-all duration-500 cursor-pointer',
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Background gradient */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-50',
        gradients[gradient]
      )} />

      {/* Animated background particles */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-hidden"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * 300,
                  y: Math.random() * 200,
                  scale: 0,
                }}
                animate={{
                  y: -50,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <motion.div
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
            )}
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <motion.button
            className="p-1 rounded-md hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Main value */}
        <div className="mb-4">
          <motion.div
            className="text-3xl font-bold text-heading mb-2"
            key={displayValue}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            {displayValue.toLocaleString()}
          </motion.div>

          {/* Trend indicator */}
          {change !== undefined && (
            <motion.div
              className={cn('flex items-center gap-1 text-sm', trendColors[trend])}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : trend === 'down' ? (
                <TrendingDown className="w-4 h-4" />
              ) : null}
              <span className="font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </motion.div>
          )}
        </div>

        {/* Additional content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
        animate={{
          translateX: isHovered ? '200%' : '-100%',
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

// Engagement metrics component
const EngagementMetrics: React.FC<{ data: DetailedMetric[] }> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((metric, index) => (
        <motion.div
          key={metric.label}
          className="flex items-center gap-2 p-3 rounded-lg bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="p-1 rounded bg-white/10">
            {metric.icon}
          </div>
          <div>
            <div className="text-xs text-muted-foreground">{metric.label}</div>
            <div className="text-sm font-semibold text-heading">{metric.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Chart placeholder component
const MiniChart: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data);
  
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className="flex-1 bg-gradient-to-t from-white/40 to-white/20 rounded-sm"
          initial={{ height: 0 }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        />
      ))}
    </div>
  );
};

export { MetricCard, EngagementMetrics, MiniChart };
