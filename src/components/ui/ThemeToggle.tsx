'use client';

import Button from '@/components/ui/Button';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 glass-subtle border-white/10"
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 glass-subtle border-sky-400/20 hover:bg-sky-500/10 transition-all duration-300 group"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
          ) : (
            <Moon className="h-4 w-4 text-sky-600 group-hover:text-sky-500 transition-colors duration-300" />
          )}
          <div className="absolute inset-0 bg-current opacity-20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
