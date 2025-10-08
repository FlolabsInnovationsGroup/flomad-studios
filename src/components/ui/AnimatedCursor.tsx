'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface AnimatedCursorProps {
  color?: string;
  outerScale?: number;
  innerScale?: number;
  outerAlpha?: number;
  innerSize?: number;
  outerSize?: number;
  trailingSpeed?: number;
}

export default function AnimatedCursor({
  outerScale = 4,
  innerScale = 0.7,
  outerAlpha = 0.3,
  innerSize = 8,
  outerSize = 20,
  trailingSpeed = 0.2
}: AnimatedCursorProps) {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Prevent hydration issues by only rendering on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get theme-appropriate color
  const getColor = () => {
    return theme === 'dark' ? '#3b82f6' : '#1d4ed8'; // blue-500 for dark, blue-700 for light
  };

  const initCursor = () => {
    // Add listener for mouse movements
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Add listeners for hover effects on buttons, links and any clickable elements
    const clickables = document.querySelectorAll('a, button, input[type="submit"], input[type="button"], .tilt-card, .hover-scale');
    clickables.forEach((element) => {
      element.addEventListener('mouseenter', onMouseHoverClickable);
      element.addEventListener('mouseleave', onMouseLeaveClickable);
    });
  };

  const onMouseMove = (e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  };

  const onMouseEnter = () => {
    setIsVisible(true);
  };

  const onMouseLeave = () => {
    setIsVisible(false);
  };

  const onMouseDown = () => {
    setIsActive(true);
  };

  const onMouseUp = () => {
    setIsActive(false);
  };

  const onMouseHoverClickable = () => {
    setIsActiveClickable(true);
  };

  const onMouseLeaveClickable = () => {
    setIsActiveClickable(false);
  };

  useEffect(() => {
    // Initialize cursor with event listeners
    initCursor();

    // Animate cursor position
    let animationFrameId: number;
    const animateCursor = () => {
      setMousePosition(prevPosition => {
        // Calculate new position with trailing effect
        return {
          x: prevPosition.x + (mouseRef.current.x - prevPosition.x) * trailingSpeed,
          y: prevPosition.y + (mouseRef.current.y - prevPosition.y) * trailingSpeed
        };
      });
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    animationFrameId = requestAnimationFrame(animateCursor);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);

      const clickables = document.querySelectorAll('a, button, input[type="submit"], input[type="button"], .tilt-card, .hover-scale');
      clickables.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseHoverClickable);
        element.removeEventListener('mouseleave', onMouseLeaveClickable);
      });

      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trailingSpeed]);

  // Get current color based on theme
  const currentColor = getColor();

  // Cursor styles based on state
  const outerCircleVariants = {
    default: {
      height: outerSize,
      width: outerSize,
      opacity: isVisible ? outerAlpha : 0,
      scale: 1,
      backgroundColor: currentColor,
    },
    active: {
      height: outerSize,
      width: outerSize,
      opacity: isVisible ? outerAlpha * 1.5 : 0,
      scale: 0.8,
      backgroundColor: currentColor,
    },
    clickable: {
      height: outerSize,
      width: outerSize,
      opacity: isVisible ? outerAlpha * 1.5 : 0,
      scale: outerScale,
      backgroundColor: currentColor,
    }
  };

  const innerCircleVariants = {
    default: {
      height: innerSize,
      width: innerSize,
      opacity: isVisible ? 1 : 0,
      scale: 1,
      backgroundColor: currentColor,
    },
    active: {
      height: innerSize,
      width: innerSize,
      opacity: isVisible ? 1 : 0,
      scale: innerScale,
      backgroundColor: currentColor,
    },
    clickable: {
      height: innerSize,
      width: innerSize,
      opacity: isVisible ? 1 : 0,
      scale: innerScale,
      backgroundColor: currentColor,
    }
  };

  const outerCircleStyle = isActiveClickable 
    ? "clickable" 
    : isActive 
      ? "active" 
      : "default";

  // Don't render on server to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={outerCircleRef}
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - outerSize / 2,
          top: mousePosition.y - outerSize / 2,
        }}
        animate={outerCircleStyle}
        variants={outerCircleVariants}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - innerSize / 2,
          top: mousePosition.y - innerSize / 2,
        }}
        animate={outerCircleStyle}
        variants={innerCircleVariants}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.25
        }}
      />
    </>
  );
} 
