'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'accent' | 'ghost' | 'sky';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation select-none tracking-wide';

    const variants = {
      default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-[0.98]',
      outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 hover:shadow-md active:scale-[0.98]',
      accent: 'bg-accent text-accent-foreground shadow-sm hover:bg-accent/90 hover:shadow-md active:scale-[0.98]',
      ghost: 'text-foreground hover:bg-accent/10 hover:text-foreground active:scale-[0.98]',
      sky: 'bg-gradient-to-r from-primary/20 to-secondary/30 text-primary-foreground shadow-lg hover:from-primary/30 hover:to-secondary/40 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0',
    } as const;

    const sizes = {
      sm: 'h-8 px-4 py-2 text-sm min-h-[32px] gap-2',
      md: 'h-10 px-6 py-3 text-base min-h-[40px] gap-2',
      lg: 'h-12 px-8 py-4 text-lg min-h-[48px] gap-3',
      icon: 'h-9 w-9 p-0 min-h-[36px] min-w-[36px]',
    };

    const content = (
      <>
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </>
    );

    return (
      <Comp
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {asChild ? children : content}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button; 
