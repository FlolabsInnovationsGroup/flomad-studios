import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'outline' | 'glass' | 'glass-subtle' | 'glass-elevated';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass-subtle', hover = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-300';
    
    const variants = {
      default: 'bg-background shadow-md',
      surface: 'bg-background-surface shadow-md',
      outline: 'border border-border bg-background',
      glass: 'glass',
      'glass-subtle': 'glass-subtle',
      'glass-elevated': 'glass-elevated'
    };

    const hoverStyles = hover ? 'hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1' : '';

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card; 
