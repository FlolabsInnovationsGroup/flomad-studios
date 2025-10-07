'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Prevent any server-side rendering and check for mobile
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Creative studio shapes array with studio-relevant elements
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      type: 'camera' | 'microphone' | 'play' | 'record' | 'film' | 'note' | 'waveform';
      rotation: number;
      speed: number;
      opacity: number;
    }> = [];
    
    // Use seeded values with creative studio themes
    const seedValues = [
      { x: 0.1, y: 0.2, size: 0.6, type: 'camera', rotation: 0.1, speed: 0.3, opacity: 0.4 },
      { x: 0.8, y: 0.1, size: 0.4, type: 'microphone', rotation: 0.5, speed: 0.4, opacity: 0.3 },
      { x: 0.3, y: 0.7, size: 0.8, type: 'play', rotation: 0.8, speed: 0.2, opacity: 0.2 },
      { x: 0.9, y: 0.6, size: 0.3, type: 'record', rotation: 0.3, speed: 0.5, opacity: 0.5 },
      { x: 0.2, y: 0.9, size: 0.7, type: 'film', rotation: 0.7, speed: 0.3, opacity: 0.3 },
      { x: 0.6, y: 0.3, size: 0.5, type: 'note', rotation: 0.2, speed: 0.4, opacity: 0.4 },
      { x: 0.7, y: 0.8, size: 0.6, type: 'waveform', rotation: 0.9, speed: 0.2, opacity: 0.2 },
      { x: 0.4, y: 0.1, size: 0.4, type: 'camera', rotation: 0.4, speed: 0.5, opacity: 0.5 },
      { x: 0.1, y: 0.5, size: 0.9, type: 'microphone', rotation: 0.6, speed: 0.3, opacity: 0.1 },
      { x: 0.9, y: 0.2, size: 0.3, type: 'play', rotation: 0.1, speed: 0.4, opacity: 0.4 },
      { x: 0.5, y: 0.9, size: 0.7, type: 'record', rotation: 0.8, speed: 0.2, opacity: 0.3 },
      { x: 0.8, y: 0.4, size: 0.4, type: 'film', rotation: 0.5, speed: 0.5, opacity: 0.2 },
      { x: 0.3, y: 0.1, size: 0.8, type: 'note', rotation: 0.3, speed: 0.3, opacity: 0.4 },
      { x: 0.6, y: 0.7, size: 0.5, type: 'waveform', rotation: 0.7, speed: 0.4, opacity: 0.3 },
      { x: 0.2, y: 0.6, size: 0.6, type: 'camera', rotation: 0.2, speed: 0.2, opacity: 0.2 },
    ];
    
    // Create shapes with deterministic values
    seedValues.forEach((seed) => {
      shapes.push({
        x: seed.x * canvas.width,
        y: seed.y * canvas.height,
        size: seed.size * 40 + 20,
        type: seed.type as 'play' | 'camera' | 'microphone' | 'record' | 'film' | 'note' | 'waveform',
        rotation: seed.rotation * Math.PI * 2,
        speed: seed.speed * 0.5 + 0.2,
        opacity: seed.opacity * 0.3 + 0.1,
      });
    });
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Color scheme based on theme
      const isDark = theme === 'dark';
      const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
      const accentColors = [
        '99, 102, 241',   // indigo
        '236, 72, 153',   // pink
        '245, 158, 11',   // amber
        '6, 182, 212',    // cyan
      ];
      
      shapes.forEach((shape, index) => {
        ctx.save();
        
        // Update rotation
        shape.rotation += shape.speed * 0.01;
        
        // Slowly move shapes
        shape.x += Math.sin(Date.now() * 0.001 + index) * 0.5;
        shape.y += Math.cos(Date.now() * 0.001 + index) * 0.3;
        
        // Wrap around screen
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
        
        // Set up drawing context
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        
        // Use accent color for some shapes, base color for others
        const useAccent = index % 3 === 0;
        const color = useAccent 
          ? accentColors[index % accentColors.length]
          : baseColor;
        
        ctx.strokeStyle = `rgba(${color}, ${shape.opacity})`;
        ctx.fillStyle = `rgba(${color}, ${shape.opacity * 0.3})`;
        ctx.lineWidth = 2;
        
        // Draw different creative studio shapes
        switch (shape.type) {
          case 'camera':
            // Camera body
            ctx.beginPath();
            ctx.rect(-shape.size / 3, -shape.size / 4, shape.size / 1.5, shape.size / 2);
            ctx.stroke();
            // Lens
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 6, 0, Math.PI * 2);
            ctx.stroke();
            break;
            
          case 'microphone':
            // Mic body
            ctx.beginPath();
            ctx.rect(-shape.size / 8, -shape.size / 3, shape.size / 4, shape.size / 1.5);
            ctx.stroke();
            // Mic head
            ctx.beginPath();
            ctx.arc(0, -shape.size / 3, shape.size / 6, 0, Math.PI * 2);
            ctx.stroke();
            break;
            
          case 'play':
            // Play button triangle
            ctx.beginPath();
            ctx.moveTo(-shape.size / 4, -shape.size / 3);
            ctx.lineTo(shape.size / 3, 0);
            ctx.lineTo(-shape.size / 4, shape.size / 3);
            ctx.closePath();
            ctx.stroke();
            break;
            
          case 'record':
            // Record button circle
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 3, 0, Math.PI * 2);
            ctx.stroke();
            // Inner circle
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 6, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'film':
            // Film strip
            ctx.beginPath();
            ctx.rect(-shape.size / 2, -shape.size / 6, shape.size, shape.size / 3);
            ctx.stroke();
            // Film holes
            for (let i = -2; i <= 2; i++) {
              ctx.beginPath();
              ctx.rect(i * shape.size / 8 - shape.size / 20, -shape.size / 12, shape.size / 10, shape.size / 6);
              ctx.stroke();
            }
            break;
            
          case 'note':
            // Musical note
            ctx.beginPath();
            ctx.arc(0, shape.size / 4, shape.size / 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(shape.size / 6, shape.size / 4);
            ctx.lineTo(shape.size / 6, -shape.size / 3);
            ctx.stroke();
            break;
            
          case 'waveform':
            // Audio waveform
            ctx.beginPath();
            ctx.moveTo(-shape.size / 2, 0);
            for (let i = 0; i < 5; i++) {
              const x = (-shape.size / 2) + (i * shape.size / 4);
              const height = (i % 2 === 0 ? shape.size / 4 : shape.size / 8);
              ctx.lineTo(x, -height);
              ctx.lineTo(x + shape.size / 8, height);
            }
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [theme, isMounted]);
  
  // Don't render anything on server to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }
  
  // Only show geometric background in dark mode and on desktop
  if (theme !== 'dark' || isMobile) {
    return null;
  }
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-15 geometric-canvas"
    />
  );
}
