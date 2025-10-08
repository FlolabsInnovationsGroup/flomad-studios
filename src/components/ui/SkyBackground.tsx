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

interface DayParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  type: 'pollen' | 'dust' | 'sparkle';
  color: string;
}

interface SunRay {
  id: number;
  angle: number;
  length: number;
  opacity: number;
  width: number;
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
  const [shootingStars, setShootingStars] = useState<{ id: number; x: number; y: number; active: boolean }[]>([]);
  const [dayParticles, setDayParticles] = useState<DayParticle[]>([]);
  const [sunRays, setSunRays] = useState<SunRay[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day');

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

    // Generate enhanced cloud system with multiple types
    const generateClouds = () => {
      const newClouds: Cloud[] = [];

      // Large prominent cumulus clouds - fluffy, dramatic
      for (let i = 0; i < 5; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 150 - 50,
          y: Math.random() * 35 + 15, // Spread across more of the sky
          width: Math.random() * 25 + 20, // Much larger clouds
          height: Math.random() * 15 + 10,
          opacity: Math.random() * 0.6 + 0.6, // More opaque/visible
          speed: Math.random() * 0.03 + 0.02,
          type: 'cumulus',
          depth: Math.random() * 0.4 + 0.6
        });
      }

      // Wispy cirrus clouds - high altitude, more visible with better mobile proportions
      for (let i = 5; i < 9; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 130 - 30,
          y: Math.random() * 20 + 5, // Higher in sky
          width: Math.random() * 35 + 25, // Larger for visibility
          height: Math.random() * 12 + 8, // Increased height for better mobile appearance
          opacity: Math.random() * 0.5 + 0.4, // More visible
          speed: Math.random() * 0.04 + 0.025,
          type: 'cirrus',
          depth: Math.random() * 0.3 + 0.8
        });
      }

      // Background stratus layer - atmospheric coverage
      for (let i = 9; i < 12; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 160 - 60,
          y: Math.random() * 30 + 20,
          width: Math.random() * 40 + 30, // Very large background layers
          height: Math.random() * 10 + 6,
          opacity: Math.random() * 0.3 + 0.2,
          speed: Math.random() * 0.025 + 0.015,
          type: 'stratus',
          depth: Math.random() * 0.3 + 0.7
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

    // Generate daytime atmospheric particles
    const generateDayParticles = () => {
      const newParticles: DayParticle[] = [];
      
      // Subtle atmospheric particles - like real sky
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 80,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.2,
          speed: Math.random() * 0.2 + 0.1,
          drift: Math.random() * 0.3 + 0.1,
          type: 'pollen',
          color: 'rgba(255, 255, 255, '
        });
      }

      // Dust motes - very subtle like real atmosphere
      for (let i = 12; i < 25; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 90,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.15 + 0.05,
          drift: Math.random() * 0.2 + 0.1,
          type: 'dust',
          color: 'rgba(255, 255, 255, '
        });
      }

      // Minimal atmospheric sparkles - like light refracting in atmosphere
      for (let i = 25; i < 35; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 60, // Upper atmosphere only
          size: Math.random() * 1 + 0.3,
          opacity: Math.random() * 0.4 + 0.1,
          speed: Math.random() * 0.1 + 0.02,
          drift: Math.random() * 0.15 + 0.05,
          type: 'sparkle',
          color: 'rgba(173, 216, 230, '
        });
      }

      setDayParticles(newParticles);
    };

    // Generate dynamic sun rays
    const generateSunRays = () => {
      const newRays: SunRay[] = [];
      
      for (let i = 0; i < 8; i++) {
        newRays.push({
          id: i,
          angle: (360 / 8) * i + Math.random() * 10 - 5,
          length: Math.random() * 30 + 40,
          opacity: Math.random() * 0.15 + 0.05,
          width: Math.random() * 3 + 1
        });
      }
      
      setSunRays(newRays);
    };

    // Determine time of day for enhanced effects
    const determineTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) setTimeOfDay('dawn');
      else if (hour >= 8 && hour < 17) setTimeOfDay('day');
      else if (hour >= 17 && hour < 20) setTimeOfDay('dusk');
      else setTimeOfDay('night');
    };

    generateStars();
    generateClouds();
    generateConstellations();
    generateNebulae();
    generateShootingStars();
    generateDayParticles();
    generateSunRays();
    determineTimeOfDay();
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
                    initial={{ pathLength: 1, opacity: 0.6 }}
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

          {/* Enhanced Sun with natural warm light */}
          <div className="absolute top-[12%] right-[15%]">
            <motion.div
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-white via-orange-50 to-orange-100 shadow-2xl"
              style={{
                boxShadow: '0 0 40px rgba(255, 248, 240, 0.6), 0 0 80px rgba(255, 245, 230, 0.3), inset -4px -4px 8px rgba(0, 0, 0, 0.05)'
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
              {/* Sun surface texture - subtle */}
              <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-orange-100/40" />
              <div className="absolute top-6 right-3 w-1.5 h-1.5 rounded-full bg-orange-50/30" />
              <div className="absolute bottom-4 left-6 w-1 h-1 rounded-full bg-white/20" />
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
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{
                opacity: [1, 1, 1],
                x: [0, 150, 200],
                y: [0, 80, 120],
                scale: [1, 1, 0.5]
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
          {/* Natural sky with atmospheric perspective */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400/90 via-sky-200/70 to-slate-100" />

          {/* Atmospheric layers that create depth like real sky */}
          <div className="absolute inset-0">
            {/* Upper atmosphere - deeper blue */}
            <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-blue-500/60 to-transparent" />
            
            {/* Mid atmosphere - lighter blue */}
            <div className="absolute top-1/4 left-0 right-0 h-1/2 bg-gradient-to-b from-sky-400/40 via-sky-300/30 to-transparent" />
            
            {/* Lower atmosphere - horizon haze */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/90 via-blue-100/60 to-transparent" />
          </div>

          {/* Realistic atmospheric scattering */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/20 to-white/40" />

          {/* Natural cloud coverage base layer */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 40% 20% at 20% 30%, rgba(255, 255, 255, 0.6) 0%, transparent 70%),
                radial-gradient(ellipse 60% 25% at 80% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 60%),
                radial-gradient(ellipse 35% 15% at 60% 40%, rgba(255, 255, 255, 0.5) 0%, transparent 80%)
              `
            }}
          />
          
          {/* Dynamic weather-based overlay */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: timeOfDay === 'dawn' 
                ? 'linear-gradient(135deg, rgba(255, 183, 77, 0.2) 0%, transparent 50%)'
                : timeOfDay === 'dusk'
                ? 'linear-gradient(225deg, rgba(255, 154, 46, 0.15) 0%, transparent 50%)'
                : 'linear-gradient(180deg, rgba(135, 206, 235, 0.1) 0%, transparent 40%)'
            }}
            animate={{
              opacity: [0.3, 0.6, 0.4],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Realistic sun with natural positioning */}
          <div className="absolute top-[20%] right-[25%]">
            {/* Subtle sun rays - like real sunlight */}
            {sunRays.map((ray) => (
              <motion.div
                key={ray.id}
                className="absolute"
                style={{
                  width: `${ray.width * 1.5}px`,
                  height: `${ray.length * 1.2}px`,
                  background: `linear-gradient(to bottom, rgba(255, 255, 255, ${ray.opacity * 0.6}) 0%, rgba(255, 255, 200, ${ray.opacity * 0.3}) 50%, transparent 100%)`,
                  transformOrigin: 'top center',
                  transform: `translate(-50%, -50%) rotate(${ray.angle}deg)`,
                  filter: 'blur(1px)',
                }}
                animate={{
                  opacity: [ray.opacity * 0.3, ray.opacity * 0.7, ray.opacity * 0.4],
                  height: [`${ray.length * 1.1}px`, `${ray.length * 1.3}px`, `${ray.length * 1.15}px`],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Professional sun glow area */}
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              style={{
                transform: 'translate(-50%, -50%)',
                background: timeOfDay === 'dawn' || timeOfDay === 'dusk'
                  ? 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(253, 186, 116, 0.2) 50%, transparent 80%)'
                  : 'radial-gradient(circle, rgba(255, 255, 200, 0.25) 0%, rgba(255, 255, 220, 0.15) 50%, transparent 80%)',
              }}
              animate={{
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Enhanced sun disk with realistic appearance */}
            <motion.div
              className="absolute w-16 h-16 rounded-full"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, #ffeb3b 0%, #ffc107 70%, #ff9800 100%)',
                boxShadow: '0 0 30px rgba(255, 235, 59, 0.8), 0 0 60px rgba(255, 235, 59, 0.4), 0 0 100px rgba(255, 235, 59, 0.2)'
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Sun corona effect */}
            <motion.div
              className="absolute w-24 h-24 rounded-full"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 235, 59, 0.2) 0%, rgba(255, 193, 7, 0.1) 50%, transparent 80%)',
              }}
              animate={{
                scale: [0.9, 1.1, 0.9],
                rotate: [0, 360],
              }}
              transition={{
                scale: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }
              }}
            />
          </div>

          {/* Enhanced cloud system with multiple types and volume lighting */}
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
              {/* Cloud shadow for depth */}
              <div 
                className="absolute w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.08) 30%, transparent 70%)',
                  transform: 'translate(2%, 8%) scale(0.9)',
                  zIndex: -1
                }}
              />

              {/* Cloud type-specific rendering */}
              <div className="relative w-full h-full">
                {cloud.type === 'cumulus' && (
                  <>
                    {/* Main cloud body with proper 3D shading */}
                    <div
                      className="absolute w-full h-3/4 bottom-0 left-0"
                      style={{
                        background: `
                          radial-gradient(ellipse 70% 60% at 30% 40%, 
                            rgba(255, 255, 255, 1) 0%,
                            rgba(250, 250, 255, 0.95) 25%,
                            rgba(240, 245, 255, 0.9) 50%,
                            rgba(220, 225, 240, 0.7) 75%,
                            rgba(200, 210, 230, 0.4) 100%
                          )
                        `,
                        borderRadius: '60% 65% 45% 50% / 50% 55% 40% 45%',
                        boxShadow: `
                          inset -15px -20px 40px rgba(180, 190, 220, 0.3),
                          inset 10px 15px 30px rgba(255, 255, 255, 0.8),
                          0 5px 15px rgba(0, 0, 0, 0.1)
                        `
                      }}
                    />
                    
                    {/* Left cloud puff with volume */}
                    <div
                      className="absolute w-2/5 h-4/5 left-0 top-1/5"
                      style={{
                        background: `
                          radial-gradient(circle at 60% 70%, 
                            rgba(255, 255, 255, 1) 0%,
                            rgba(248, 252, 255, 0.95) 30%,
                            rgba(230, 240, 250, 0.8) 60%,
                            rgba(210, 220, 235, 0.5) 85%,
                            transparent 100%
                          )
                        `,
                        borderRadius: '50%',
                        transform: 'rotate(-8deg) scale(1.1, 0.9)',
                        boxShadow: `
                          inset -10px -15px 25px rgba(190, 200, 220, 0.4),
                          inset 8px 10px 20px rgba(255, 255, 255, 0.6)
                        `
                      }}
                    />
                    
                    {/* Right cloud puff with highlights */}
                    <div
                      className="absolute w-3/5 h-4/5 right-0 top-1/6"
                      style={{
                        background: `
                          radial-gradient(ellipse at 40% 60%, 
                            rgba(255, 255, 255, 1) 0%,
                            rgba(250, 254, 255, 0.9) 25%,
                            rgba(235, 245, 255, 0.85) 50%,
                            rgba(215, 225, 240, 0.6) 75%,
                            rgba(195, 205, 225, 0.3) 100%
                          )
                        `,
                        borderRadius: '45%',
                        transform: 'rotate(12deg) scale(0.9, 1.1)',
                        boxShadow: `
                          inset -12px -18px 30px rgba(170, 180, 210, 0.35),
                          inset 15px 20px 35px rgba(255, 255, 255, 0.7),
                          0 3px 8px rgba(0, 0, 0, 0.08)
                        `
                      }}
                    />
                    
                    {/* Top highlight dome */}
                    <div
                      className="absolute w-1/2 h-3/5 left-1/4 top-0"
                      style={{
                        background: `
                          radial-gradient(ellipse at 50% 80%, 
                            rgba(255, 255, 255, 1) 0%,
                            rgba(252, 254, 255, 0.95) 20%,
                            rgba(240, 248, 255, 0.85) 45%,
                            rgba(225, 235, 250, 0.6) 70%,
                            transparent 100%
                          )
                        `,
                        borderRadius: '50%',
                        boxShadow: `
                          inset -8px -12px 20px rgba(200, 210, 230, 0.3),
                          inset 12px 18px 25px rgba(255, 255, 255, 0.8)
                        `
                      }}
                    />
                    
                    {/* Additional texture bumps */}
                    <div
                      className="absolute w-1/4 h-2/5 left-1/6 top-2/5"
                      style={{
                        background: `
                          radial-gradient(circle, 
                            rgba(255, 255, 255, 0.9) 0%,
                            rgba(245, 250, 255, 0.7) 50%,
                            transparent 100%
                          )
                        `,
                        borderRadius: '50%',
                        transform: 'rotate(-20deg)',
                        boxShadow: 'inset -3px -5px 10px rgba(220, 225, 240, 0.4)'
                      }}
                    />
                    <div
                      className="absolute w-1/5 h-1/3 right-1/5 top-1/3"
                      style={{
                        background: `
                          radial-gradient(circle, 
                            rgba(255, 255, 255, 0.85) 0%,
                            rgba(248, 252, 255, 0.6) 60%,
                            transparent 100%
                          )
                        `,
                        borderRadius: '50%',
                        transform: 'rotate(25deg)',
                        boxShadow: 'inset -2px -4px 8px rgba(210, 220, 235, 0.3)'
                      }}
                    />
                  </>
                )}

                {cloud.type === 'cirrus' && (
                  <>
                    {/* Main cirrus streak - improved mobile appearance */}
                    <div
                      className="absolute w-4/5 h-1/4 sm:h-1/6 md:h-1/8 left-1/10 top-2/5"
                      style={{
                        background: `
                          linear-gradient(88deg, 
                            transparent 0%,
                            rgba(255, 255, 255, 0.2) 10%,
                            rgba(255, 255, 255, 0.6) 25%,
                            rgba(250, 250, 255, 0.8) 40%,
                            rgba(245, 248, 255, 0.7) 60%,
                            rgba(255, 255, 255, 0.5) 75%,
                            rgba(255, 255, 255, 0.2) 90%,
                            transparent 100%
                          )
                        `,
                        clipPath: 'polygon(0% 40%, 15% 20%, 30% 60%, 45% 10%, 60% 80%, 75% 30%, 90% 70%, 100% 50%, 95% 60%, 80% 40%, 65% 90%, 50% 20%, 35% 70%, 20% 80%, 5% 60%)',
                        transform: 'skewX(-20deg) scaleY(1.2)'
                      }}
                    />
                    
                    {/* Feathery tendrils */}
                    <div
                      className="absolute w-3/5 h-1/6 sm:h-1/8 md:h-1/12 left-1/5 top-1/3"
                      style={{
                        background: `
                          linear-gradient(82deg, 
                            transparent 0%,
                            rgba(255, 255, 255, 0.3) 20%,
                            rgba(252, 254, 255, 0.6) 45%,
                            rgba(248, 252, 255, 0.5) 70%,
                            rgba(255, 255, 255, 0.2) 90%,
                            transparent 100%
                          )
                        `,
                        clipPath: 'polygon(0% 50%, 20% 20%, 40% 80%, 60% 30%, 80% 70%, 100% 40%, 90% 60%, 70% 10%, 50% 90%, 30% 40%, 10% 80%)',
                        transform: 'skewX(-25deg) rotate(1deg)'
                      }}
                    />
                    
                    {/* Wispy trails */}
                    <div
                      className="absolute w-1/2 h-1/8 sm:h-1/12 md:h-1/16 left-2/5 top-3/5"
                      style={{
                        background: `
                          linear-gradient(75deg, 
                            transparent 0%,
                            rgba(255, 255, 255, 0.2) 30%,
                            rgba(250, 252, 255, 0.5) 60%,
                            rgba(255, 255, 255, 0.3) 80%,
                            transparent 100%
                          )
                        `,
                        clipPath: 'polygon(0% 40%, 25% 10%, 50% 90%, 75% 20%, 100% 60%, 85% 80%, 60% 30%, 35% 70%, 10% 90%)',
                        transform: 'skewX(-30deg)'
                      }}
                    />
                    
                    {/* Delicate wisps */}
                    <div
                      className="absolute w-2/5 h-1/20 left-1/4 top-1/5"
                      style={{
                        background: `
                          linear-gradient(70deg, 
                            transparent 0%,
                            rgba(255, 255, 255, 0.25) 40%,
                            rgba(248, 250, 255, 0.4) 70%,
                            transparent 100%
                          )
                        `,
                        clipPath: 'polygon(0% 50%, 30% 20%, 60% 80%, 90% 40%, 100% 60%, 70% 90%, 40% 30%, 15% 70%)',
                        transform: 'skewX(-35deg) rotate(2deg)'
                      }}
                    />
                    
                    {/* Scattered ice crystals effect */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + Math.sin(i) * 20}%`,
                          background: 'rgba(255, 255, 255, 0.6)',
                          borderRadius: '50%',
                          boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)'
                        }}
                      />
                    ))}
                  </>
                )}

                {cloud.type === 'stratus' && (
                  <>
                    {/* Main stratus layer - thick, continuous */}
                    <div
                      className="absolute w-full h-2/5 left-0 top-3/10"
                      style={{
                        background: `
                          linear-gradient(to bottom, 
                            rgba(240, 240, 245, 0.4) 0%,
                            rgba(250, 250, 255, 0.8) 15%,
                            rgba(255, 255, 255, 0.95) 35%,
                            rgba(248, 250, 255, 0.9) 55%,
                            rgba(235, 240, 250, 0.7) 75%,
                            rgba(220, 225, 240, 0.5) 90%,
                            rgba(200, 210, 230, 0.2) 100%
                          )
                        `,
                        borderRadius: '0',
                        boxShadow: `
                          inset 0 -20px 40px rgba(180, 190, 220, 0.2),
                          inset 0 10px 30px rgba(255, 255, 255, 0.6),
                          0 8px 16px rgba(0, 0, 0, 0.08)
                        `,
                        clipPath: 'polygon(0% 20%, 100% 15%, 100% 95%, 95% 100%, 85% 95%, 75% 100%, 65% 90%, 55% 100%, 45% 95%, 35% 100%, 25% 90%, 15% 100%, 5% 95%, 0% 100%)'
                      }}
                    />
                    
                    {/* Upper wispy edge */}
                    <div
                      className="absolute w-full h-1/6 left-0 top-1/5"
                      style={{
                        background: `
                          linear-gradient(to bottom, 
                            rgba(255, 255, 255, 0.3) 0%,
                            rgba(252, 254, 255, 0.6) 30%,
                            rgba(245, 250, 255, 0.5) 70%,
                            rgba(240, 245, 250, 0.2) 100%
                          )
                        `,
                        clipPath: 'polygon(0% 50%, 10% 20%, 20% 80%, 30% 30%, 40% 70%, 50% 40%, 60% 90%, 70% 20%, 80% 60%, 90% 30%, 100% 70%, 100% 100%, 0% 100%)'
                      }}
                    />
                    
                    {/* Texture variations for depth */}
                    <div
                      className="absolute w-4/5 h-1/4 left-1/10 top-2/5"
                      style={{
                        background: `
                          radial-gradient(ellipse 150% 80% at 30% 50%, 
                            rgba(255, 255, 255, 0.6) 0%,
                            rgba(250, 252, 255, 0.8) 25%,
                            rgba(245, 248, 255, 0.6) 50%,
                            rgba(240, 245, 250, 0.3) 75%,
                            transparent 100%
                          )
                        `,
                        borderRadius: '50%',
                        transform: 'scaleY(0.6)',
                        boxShadow: 'inset -10px -15px 25px rgba(200, 210, 230, 0.25)'
                      }}
                    />
                    
                    {/* Secondary texture layer */}
                    <div
                      className="absolute w-3/5 h-1/5 right-1/5 top-1/2"
                      style={{
                        background: `
                          radial-gradient(ellipse 120% 70% at 70% 40%, 
                            rgba(252, 254, 255, 0.7) 0%,
                            rgba(248, 252, 255, 0.5) 40%,
                            rgba(240, 248, 255, 0.3) 80%,
                            transparent 100%
                          )
                        `,
                        borderRadius: '60%',
                        transform: 'rotate(-2deg) scaleY(0.8)',
                        boxShadow: 'inset -8px -10px 20px rgba(210, 220, 235, 0.2)'
                      }}
                    />
                  </>
                )}

                {/* Volume lighting effect - sun rays through clouds */}
                {cloud.type === 'cumulus' && Math.random() < 0.4 && (
                  <div
                    className="absolute"
                    style={{
                      left: '60%',
                      top: '-20%',
                      width: '6px',
                      height: '150%',
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
                      transform: 'rotate(15deg)',
                      filter: 'blur(2px)'
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}

          {/* Enhanced atmospheric particles - daytime equivalent of stars */}
          {dayParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: `${particle.color}${particle.opacity})`,
                boxShadow: particle.type === 'sparkle' 
                  ? `0 0 ${particle.size * 2}px ${particle.color}${particle.opacity * 0.8})` 
                  : 'none',
              }}
              animate={{
                y: [0, -particle.speed * 100, -particle.speed * 200],
                x: [0, particle.drift * 50, particle.drift * 100],
                opacity: particle.type === 'sparkle' 
                  ? [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.5]
                  : [particle.opacity * 0.8, particle.opacity, particle.opacity * 0.9],
                scale: particle.type === 'pollen'
                  ? [0.8, 1.2, 0.9]
                  : [0.9, 1.1, 0.9],
              }}
              transition={{
                y: {
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                },
                x: {
                  duration: 12 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}

          {/* Dynamic atmosphere layers for depth */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(45deg, rgba(135, 206, 235, 0.1) 0%, transparent 40%, rgba(173, 216, 230, 0.15) 100%)'
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Atmospheric light scattering */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 40% at 70% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)'
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Gentle horizon haze */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-100/80 via-sky-50/40 to-transparent" />



          {/* Subtle wind effect through atmosphere */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 30%, transparent 60%, rgba(255, 255, 255, 0.08) 90%, transparent 100%)'
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </div>
  );
}
