'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'sky' | 'glass' | 'dark' | 'aurora';
  closable?: boolean;
  backdrop?: boolean;
  animated?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal');
  }
  return context;
}

export default function EnhancedModal({
  isOpen,
  onClose,
  title,
  size = 'md',
  variant = 'sky',
  closable = true,
  backdrop = true,
  animated = true,
  children,
  className
}: EnhancedModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closable, onClose]);

  if (!mounted) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-2xl';
      case 'xl': return 'max-w-4xl';
      case 'full': return 'max-w-[95vw] max-h-[95vh]';
      default: return 'max-w-md';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'sky':
        return 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl border border-sky-400/20';
      case 'glass':
        return 'bg-white/5 dark:bg-black/5 backdrop-blur-3xl border border-white/10 dark:border-gray-800/20';
      case 'dark':
        return 'bg-gray-900/95 dark:bg-black/95 backdrop-blur-xl border border-gray-700/50';
      case 'aurora':
        return 'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur-2xl border border-purple-400/20';
      default:
        return 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl border border-sky-400/20';
    }
  };

  const backdropVariants = {
    hidden: { 
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    visible: { 
      opacity: 1,
      backdropFilter: 'blur(8px)'
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      y: -50
    }
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <ModalContext.Provider value={{ onClose }}>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            {backdrop && (
              <motion.div
                className="absolute inset-0 bg-black/50"
                variants={animated ? backdropVariants : undefined}
                initial={animated ? "hidden" : undefined}
                animate={animated ? "visible" : undefined}
                exit={animated ? "hidden" : undefined}
                transition={{ duration: 0.3 }}
                onClick={closable ? onClose : undefined}
              />
            )}

            {/* Modal */}
            <motion.div
              className={cn(
                'relative w-full rounded-2xl shadow-2xl',
                getSizeClasses(),
                getVariantClasses(),
                className
              )}
              variants={animated ? modalVariants : undefined}
              initial={animated ? "hidden" : undefined}
              animate={animated ? "visible" : undefined}
              exit={animated ? "exit" : undefined}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || closable) && (
                <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-gray-800/20">
                  {title && (
                    <h2 className="text-xl font-semibold text-white">
                      {title}
                    </h2>
                  )}
                  {closable && (
                    <motion.button
                      onClick={onClose}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </ModalContext.Provider>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

// Modal components for common use cases
export function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("text-white/80 leading-relaxed", className)}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10 dark:border-gray-800/20", className)}>
      {children}
    </div>
  );
}

// Specialized modal variants
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "sky"
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: EnhancedModalProps['variant'];
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <EnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      variant={variant}
    >
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
        >
          {confirmText}
        </button>
      </ModalFooter>
    </EnhancedModal>
  );
}

export function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  title
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
}) {
  return (
    <EnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
      variant="glass"
    >
      <div className="flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="max-w-full max-h-[70vh] object-contain rounded-lg"
        />
      </div>
    </EnhancedModal>
  );
}