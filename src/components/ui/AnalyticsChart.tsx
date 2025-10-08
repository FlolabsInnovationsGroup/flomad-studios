'use client';

import { motion, cubicBezier } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

interface AnalyticsChartProps {
  data: Array<{ label: string; value: number; change?: number; trend?: 'up' | 'down' }>;
  type: 'bar' | 'line' | 'area' | 'donut';
  title: string;
  timeframe?: 'day' | 'week' | 'month' | 'year';
  height?: number;
  gradient?: boolean;
  interactive?: boolean;
}

export default function AnalyticsChart({
  data,
  type = 'bar',
  title,
  timeframe = 'week',
  height = 300,
  gradient = true,
  interactive = true
}: AnalyticsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  const maxValue = Math.max(...data.map(item => item.value));
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getBarHeight = (value: number) => (value / maxValue) * 100;
  
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) }
    }
  };

  const barVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (i: number) => ({
      height: `${getBarHeight(data[i]?.value || 0)}%`,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: cubicBezier(0.4, 0, 0.2, 1)
      }
    })
  };

  return (
    <motion.div 
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-800/40 p-6 shadow-xl"
      variants={chartVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {timeframe}ly overview
          </p>
        </div>
        
        {/* Chart Type Selector */}
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            aria-label="Switch to bar chart view"
            title="Bar Chart"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-400"
            aria-label="Switch to pie chart view"
            title="Pie Chart"
          >
            <PieChart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className={`h-[${height}px]`}>
          {type === 'bar' && (
            <div className="flex items-end justify-between h-full gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 h-full">
                {/* Bar */}
                <div className="w-full flex flex-col justify-end h-full px-1">
                  <motion.div
                    className={`w-full rounded-t-lg relative overflow-hidden cursor-pointer ${
                      gradient
                        ? 'bg-gradient-to-t from-blue-500 via-blue-400 to-cyan-400'
                        : 'bg-blue-500'
                    } ${hoveredIndex === index ? 'shadow-lg shadow-blue-500/30' : ''}`}
                    variants={barVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    onMouseEnter={() => interactive && setHoveredIndex(index)}
                    onMouseLeave={() => interactive && setHoveredIndex(null)}
                    whileHover={{ scale: interactive ? 1.05 : 1 }}
                  >
                    {/* Animated shimmer effect */}
                    {gradient && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                    )}
                    
                    {/* Value tooltip */}
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {item.value.toLocaleString()}
                        {item.change && (
                          <span className={`ml-2 ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {item.trend === 'up' ? '↗' : '↘'} {Math.abs(item.change)}%
                          </span>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                
                {/* Label */}
                <div className="mt-3 text-center">
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {item.label}
                  </div>
                  {animationComplete && (
                    <motion.div 
                      className="text-xs text-gray-500 dark:text-gray-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      {(item.value / 1000).toFixed(1)}k
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => {
            // Calculate position using CSS classes based on position
            const positionClass = i === 0 ? 'top-0' : 
                                 i === 1 ? 'top-1/4' : 
                                 i === 2 ? 'top-2/4' : 
                                 i === 3 ? 'top-3/4' : 'top-full';
            return (
              <div
                key={i}
                className={`absolute w-full border-t border-gray-200/50 dark:border-gray-700/50 ${positionClass}`}
              />
            );
          })}
        </div>
      </div>

      {/* Chart Footer with Summary Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Average</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-green-500 flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12.5%
          </div>
          <div className="text-xs text-gray-500">Growth</div>
        </div>
      </div>
    </motion.div>
  );
}