'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: 'sky' | 'sunset' | 'aurora' | 'cloud' | 'storm' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  ripple?: boolean;
  magnetic?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export default function EnhancedButton({
  variant = 'sky',
  size = 'md',
  loading = false,
  ripple = true,
  magnetic = false,
  glow = false,
  children,
  className,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !loading && !disabled) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (magnetic) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x: x * 0.1, y: y * 0.1 });
    }
  };

  const variants = {
    sky: {
      base: "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg shadow-sky-500/25",
      hover: "from-sky-500 to-blue-600 shadow-xl shadow-sky-500/30 scale-105",
      active: "from-sky-600 to-blue-700 scale-95"
    },
    sunset: {
      base: "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg shadow-orange-500/25",
      hover: "from-orange-500 to-pink-600 shadow-xl shadow-orange-500/30 scale-105",
      active: "from-orange-600 to-pink-700 scale-95"
    },
    aurora: {
      base: "bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25",
      hover: "from-purple-500 via-pink-600 to-cyan-600 shadow-xl shadow-purple-500/30 scale-105",
      active: "from-purple-600 via-pink-700 to-cyan-700 scale-95"
    },
    cloud: {
      base: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/40 text-gray-900 dark:text-white shadow-lg",
      hover: "bg-white/90 dark:bg-gray-700/90 border-white/30 dark:border-gray-600/50 shadow-xl scale-105",
      active: "bg-white/70 dark:bg-gray-900/70 scale-95"
    },
    storm: {
      base: "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg shadow-gray-500/25",
      hover: "from-gray-800 to-black shadow-xl shadow-gray-500/30 scale-105",
      active: "from-gray-900 to-black scale-95"
    },
    ghost: {
      base: "bg-transparent border-2 border-sky-400/50 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20",
      hover: "border-sky-500/70 bg-sky-50 dark:bg-sky-900/30 scale-105",
      active: "border-sky-600 bg-sky-100 dark:bg-sky-900/40 scale-95"
    }
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-10 py-5 text-xl rounded-2xl"
  };

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-sky-400/20",
        variants[variant].base,
        sizes[size],
        glow && "shadow-2xl",
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        if (magnetic) setMousePosition({ x: 0, y: 0 });
      }}
      whileHover={!disabled && !loading ? { 
        scale: magnetic ? 1 : 1.02,
        x: mousePosition.x,
        y: mousePosition.y
      } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {/* Glow effect */}
      {glow && (
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-sky-400/20 to-blue-500/20 blur-xl -z-10" />
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </span>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-white/10 opacity-0 pointer-events-none"
        animate={{ opacity: isPressed ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
    </motion.button>
  );
}

// Specialized button variants for common use cases
export function SkyButton({ children, ...props }: Omit<EnhancedButtonProps, 'variant'>) {
  return (
    <EnhancedButton variant="sky" glow ripple {...props}>
      {children}
    </EnhancedButton>
  );
}

export function GhostButton({ children, ...props }: Omit<EnhancedButtonProps, 'variant'>) {
  return (
    <EnhancedButton variant="ghost" magnetic ripple {...props}>
      {children}
    </EnhancedButton>
  );
}

export function AuroraButton({ children, ...props }: Omit<EnhancedButtonProps, 'variant'>) {
  return (
    <EnhancedButton variant="aurora" glow magnetic ripple {...props}>
      {children}
    </EnhancedButton>
  );
}