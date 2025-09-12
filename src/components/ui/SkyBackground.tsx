'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleDelay: number;
  color: string;
  constellation?: string;
}

interface Constellation {
  id: string;
  name: string;
  stars: { x: number; y: number; brightness: number }[];
  connections: { from: number; to: number }[];
}

interface Cloud {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  speed: number;
  type: 'cumulus' | 'cirrus' | 'stratus';
  depth: number;
}

interface Nebula {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  intensity: number;
}

export default function SkyBackground() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);
  const [nebulae, setNebulae] = useState<Nebula[]>([]);
  const [shootingStars, setShootingStars] = useState<{id: number; x: number; y: number; active: boolean}[]>([]);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Generate realistic star field with different types
    const generateStars = () => {
      const newStars: Star[] = [];
      const starColors = [
        'rgba(255, 255, 255, ', // White dwarf
        'rgba(255, 248, 220, ', // Yellow
        'rgba(255, 204, 111, ', // Orange
        'rgba(255, 180, 107, ', // Red giant
        'rgba(155, 176, 255, ', // Blue giant
        'rgba(248, 247, 255, ', // Blue-white
        'rgba(255, 229, 180, ', // Warm white
        'rgba(200, 220, 255, '  // Cool blue
      ];
      
      // Create star clusters and random distribution
      for (let i = 0; i < 400; i++) {
        const starType = Math.random();
        let size, brightness, color;
        
        // Create clusters in certain areas
        const isInCluster = Math.random() < 0.3;
        let x, y;
        
        if (isInCluster) {
          // Cluster centers
          const clusterCenters = [
            { x: 25, y: 30 }, { x: 70, y: 20 }, { x: 85, y: 60 }, { x: 15, y: 75 }
          ];
          const cluster = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
          x = cluster.x + (Math.random() - 0.5) * 20;
          y = cluster.y + (Math.random() - 0.5) * 15;
          x = Math.max(0, Math.min(100, x));
          y = Math.max(0, Math.min(100, y));
        } else {
          x = Math.random() * 100;
          y = Math.random() * 100;
        }
        
        if (starType < 0.5) {
          // Dim background stars
          size = Math.random() * 1.2 + 0.4;
          brightness = Math.random() * 0.4 + 0.2;
          color = starColors[Math.floor(Math.random() * 3)];
        } else if (starType < 0.8) {
          // Medium stars
          size = Math.random() * 2.2 + 1;
          brightness = Math.random() * 0.5 + 0.4;
          color = starColors[Math.floor(Math.random() * 6)];
        } else {
          // Bright stars
          size = Math.random() * 3.2 + 2;
          brightness = Math.random() * 0.3 + 0.7;
          color = starColors[Math.floor(Math.random() * starColors.length)];
        }
        
        newStars.push({
          id: i,
          x,
          y,
          size,
          brightness,
          twinkleDelay: Math.random() * 6,
          color: color + brightness + ')',
        });
      }
      setStars(newStars);
    };
    
    // Generate simple constellations
    const generateConstellations = () => {
      const newConstellations: Constellation[] = [
        {
          id: 'ursa-major',
          name: 'Ursa Major',
          stars: [
            { x: 20, y: 25, brightness: 0.9 },
            { x: 25, y: 20, brightness: 0.8 },
            { x: 30, y: 22, brightness: 0.85 },
            { x: 35, y: 25, brightness: 0.7 },
            { x: 32, y: 30, brightness: 0.8 },
            { x: 27, y: 32, brightness: 0.75 },
            { x: 22, y: 30, brightness: 0.8 }
          ],
          connections: [
            { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
            { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 0 }
          ]
        },
        {
          id: 'orion',
          name: 'Orion',
          stars: [
            { x: 75, y: 40, brightness: 0.9 },
            { x: 70, y: 45, brightness: 0.8 },
            { x: 80, y: 45, brightness: 0.85 },
            { x: 75, y: 50, brightness: 0.7 },
            { x: 72, y: 55, brightness: 0.8 },
            { x: 78, y: 55, brightness: 0.75 }
          ],
          connections: [
            { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 },
            { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 3, to: 5 }
          ]
        }
      ];
      setConstellations(newConstellations);
    };
    
    // Generate nebulae
    const generateNebulae = () => {
      const newNebulae: Nebula[] = [
        {
          id: 1,
          x: 15,
          y: 60,
          width: 25,
          height: 20,
          color: 'rgba(147, 51, 234, 0.15)', // Purple nebula
          intensity: 0.3
        },
        {
          id: 2,
          x: 70,
          y: 20,
          width: 20,
          height: 15,
          color: 'rgba(59, 130, 246, 0.12)', // Blue nebula
          intensity: 0.25
        }
      ];
      setNebulae(newNebulae);
    };
    
    // Generate natural, balanced clouds
    const generateClouds = () => {
      const newClouds: Cloud[] = [];
      
      for (let i = 0; i < 4; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 130 - 30,
          y: Math.random() * 30 + 15, // Spread across upper sky
          width: Math.random() * 12 + 8, // Natural cloud sizes
          height: Math.random() * 6 + 4,
          opacity: Math.random() * 0.3 + 0.2, // Visible but not overwhelming
          speed: Math.random() * 0.02 + 0.01,
          type: 'cumulus',
          depth: Math.random() * 0.2 + 0.8
        });
      }
      setClouds(newClouds);
    };
    
    // Generate shooting stars
    const generateShootingStars = () => {
      setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
          const newStar = {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 50,
            active: true
          };
          setShootingStars(prev => [...prev, newStar]);
          
          // Remove after animation
          setTimeout(() => {
            setShootingStars(prev => prev.filter(s => s.id !== newStar.id));
          }, 2000);
        }
      }, 8000); // Check every 8 seconds
    };
    
    generateStars();
    generateClouds();
    generateConstellations();
    generateNebulae();
    generateShootingStars();
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  const isDark = theme === 'dark';
  
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {isDark ? (
        // Enhanced Night Sky
        <div className="absolute inset-0">
          {/* Deep space gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950" />
          
          {/* Enhanced Milky Way with multiple layers and depth */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(ellipse 120% 70% at 65% 25%, rgba(147, 197, 253, 0.25) 0%, transparent 60%),
                radial-gradient(ellipse 90% 50% at 45% 45%, rgba(196, 181, 253, 0.18) 0%, transparent 50%),
                radial-gradient(ellipse 70% 35% at 80% 65%, rgba(167, 139, 250, 0.12) 0%, transparent 40%),
                radial-gradient(ellipse 100% 20% at 50% 80%, rgba(219, 234, 254, 0.08) 0%, transparent 50%)
              `
            }}
          />
          
          {/* Aurora Borealis effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 pointer-events-none"
            animate={{
              opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(180deg, 
                    rgba(34, 197, 94, 0.15) 0%, 
                    rgba(59, 130, 246, 0.12) 30%, 
                    rgba(147, 51, 234, 0.08) 60%, 
                    transparent 80%
                  )
                `,
                filter: 'blur(2px)',
                transform: 'skewX(-15deg)',
              }}
            />
          </motion.div>
          
          {/* Deep space dust lanes */}
          <div className="absolute inset-0 opacity-8">
            <div
              className="absolute w-full h-full"
              style={{
                background: `
                  linear-gradient(135deg, transparent 0%, rgba(30, 30, 50, 0.4) 20%, transparent 40%),
                  linear-gradient(45deg, transparent 60%, rgba(20, 20, 40, 0.3) 80%, transparent 100%)
                `,
                filter: 'blur(1px)',
              }}
            />
          </div>
          
          {/* Nebulae */}
          {nebulae.map((nebula) => (
            <motion.div
              key={nebula.id}
              className="absolute rounded-full"
              style={{
                left: `${nebula.x}%`,
                top: `${nebula.y}%`,
                width: `${nebula.width}%`,
                height: `${nebula.height}%`,
                background: `radial-gradient(ellipse, ${nebula.color} 0%, transparent 70%)`,
                filter: 'blur(2px)',
              }}
              animate={{
                opacity: [nebula.intensity * 0.7, nebula.intensity, nebula.intensity * 0.7],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Enhanced twinkling stars with realistic colors */}
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: star.twinkleDelay,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Constellation lines */}
          {constellations.map((constellation) => (
            <svg
              key={constellation.id}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {constellation.connections.map((connection, connectionIndex) => {
                const fromStar = constellation.stars[connection.from];
                const toStar = constellation.stars[connection.to];
                if (!fromStar || !toStar) return null;
                
                return (
                  <motion.line
                    key={connectionIndex}
                    x1={`${fromStar.x}%`}
                    y1={`${fromStar.y}%`}
                    x2={`${toStar.x}%`}
                    y2={`${toStar.y}%`}
                    stroke="rgba(147, 197, 253, 0.3)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{
                      duration: 2,
                      delay: connectionIndex * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </svg>
          ))}
          
          {/* Enhanced Moon with craters and phases */}
          <div className="absolute top-[12%] right-[15%]">
            <motion.div 
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 shadow-2xl"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 200, 0.3), inset -8px -8px 0 rgba(0, 0, 0, 0.1)'
              }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Moon craters */}
              <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-yellow-300/50" />
              <div className="absolute top-6 right-3 w-1.5 h-1.5 rounded-full bg-yellow-300/40" />
              <div className="absolute bottom-4 left-6 w-1 h-1 rounded-full bg-yellow-300/30" />
            </motion.div>
          </div>
          
          {/* Dynamic shooting stars */}
          {shootingStars.map((shootingStar) => (
            <motion.div
              key={shootingStar.id}
              className="absolute w-1 h-12 bg-gradient-to-b from-white via-blue-200 to-transparent rounded-full"
              style={{
                left: `${shootingStar.x}%`,
                top: `${shootingStar.y}%`,
                transform: 'rotate(35deg)',
              }}
              initial={{ opacity: 0, x: -50, y: -20, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                x: [0, 150, 200], 
                y: [0, 80, 120],
                scale: [0, 1, 0.5]
              }}
              transition={{
                duration: 1.8,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Atmospheric glow at horizon */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-900/30 to-transparent" />
        </div>
      ) : (
        // Natural Day Sky with Professional Enhancement
        <div className="absolute inset-0">
          {/* Enhanced realistic sky gradient with professional depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-100 to-white" />
          
          {/* Professional atmospheric depth layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-blue-50/20 to-slate-50/40" />
          
          {/* Subtle professional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-sky-50/30 to-blue-50/20" />
          
          {/* Enhanced sun with professional styling */}
          <div className="absolute top-[15%] right-[20%]">
            {/* Professional sun glow area */}
            <div 
              className="absolute w-40 h-40 rounded-full"
              style={{ 
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 255, 200, 0.25) 0%, rgba(255, 255, 220, 0.15) 50%, transparent 80%)',
              }}
            />
            {/* Refined sun disk */}
            <div 
              className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-yellow-200 to-amber-300"
              style={{ 
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 20px rgba(255, 255, 180, 0.5), 0 0 40px rgba(255, 255, 180, 0.2)'
              }}
            />
          </div>
          
          {/* Natural, fluffy clouds */}
          {clouds.map((cloud) => (
            <motion.div
              key={cloud.id}
              className="absolute"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                width: `${cloud.width}%`,
                height: `${cloud.height}%`,
                opacity: cloud.opacity,
              }}
              animate={{
                x: ['0%', '110%'],
              }}
              transition={{
                duration: 90 + Math.random() * 60,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 40,
              }}
            >
              {/* Realistic cloud shape with multiple puffs */}
              <div className="relative w-full h-full">
                {/* Main cloud body */}
                <div 
                  className="absolute w-3/5 h-4/5 rounded-full left-1/5 top-1/10"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.9) 40%, rgba(255, 255, 255, 0.6) 80%, transparent)',
                    filter: 'blur(0.5px)'
                  }}
                />
                {/* Left puff */}
                <div 
                  className="absolute w-2/5 h-3/5 rounded-full left-0 top-1/4"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.4) 90%, transparent)',
                    filter: 'blur(0.3px)'
                  }}
                />
                {/* Right puff */}
                <div 
                  className="absolute w-2/5 h-3/5 rounded-full right-0 top-1/5"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.3) 90%, transparent)',
                    filter: 'blur(0.3px)'
                  }}
                />
                {/* Top puff for volume */}
                <div 
                  className="absolute w-1/3 h-1/2 rounded-full left-1/3 top-0"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.6) 60%, transparent)',
                    filter: 'blur(0.2px)'
                  }}
                />
              </div>
            </motion.div>
          ))}
          
          {/* Gentle horizon haze */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50/60 via-sky-50/30 to-transparent" />
          
          {/* Occasional bird silhouettes - very subtle */}
          <motion.div
            className="absolute top-[35%] left-0 z-10"
            animate={{
              x: ['-2%', '102%'],
              y: [0, -5, 3, -2, 0],
            }}
            transition={{
              x: { duration: 60, repeat: Infinity, ease: "linear" },
              y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="flex gap-1">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 h-0.5 bg-gray-500/40 rounded-full"
                  style={{
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
