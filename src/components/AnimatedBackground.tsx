
import React, { useEffect, useRef } from 'react';
import { Triangle, Circle, Square } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Adjusted numbers of shapes for mobile and desktop
const TOTAL_SHAPES_DESKTOP = 30;
const TOTAL_SHAPES_MOBILE = 15; // Increased from 10 to 15

const AnimatedBackground: React.FC = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL_SHAPES = isMobile ? TOTAL_SHAPES_MOBILE : TOTAL_SHAPES_DESKTOP;
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const shapes = container.querySelectorAll('.animated-shape');
    
    shapes.forEach((shape) => {
      // Set random initial positions
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const scale = 0.2 + Math.random() * (isMobile ? 1.2 : 1.5); // Increased scale for mobile
      const duration = 10 + Math.random() * (isMobile ? 15 : 20); // Faster animations on mobile
      const delay = Math.random() * -20;
      const zIndex = Math.floor(Math.random() * 10);
      
      const element = shape as HTMLElement;
      element.style.left = `${xPos}%`;
      element.style.top = `${yPos}%`;
      element.style.transform = `scale(${scale})`;
      element.style.animationDuration = `${duration}s`;
      element.style.animationDelay = `${delay}s`;
      element.style.zIndex = `${zIndex}`;
    });
  }, [isMobile]);
  
  const renderShapes = () => {
    const shapes = [];
    
    for (let i = 0; i < TOTAL_SHAPES; i++) {
      const shapeType = i % 3;
      const opacity = (isMobile ? 0.6 : 0.7) + Math.random() * 0.3; // Increased opacity on mobile
      const size = 12 + Math.floor(Math.random() * (isMobile ? 20 : 24)); // Larger size range on mobile
      
      // Determine which shape to render with neon glow effect
      let shape;
      if (shapeType === 0) {
        shape = <Triangle className="w-full h-full text-squid-pink" />;
      } else if (shapeType === 1) {
        shape = <Circle className="w-full h-full text-squid-pink" />;
      } else {
        shape = <Square className="w-full h-full text-squid-pink" />;
      }
      
      // Enhanced animation classes for mobile
      const mobileAnimClass = isMobile 
        ? `animate-${i % 4 === 0 ? 'float' : i % 4 === 1 ? 'pulse-slow' : i % 4 === 2 ? 'rotate-slow' : 'neon-pulse'}`
        : 'animate-float-3d';
      
      shapes.push(
        <div
          key={i}
          className={`animated-shape absolute opacity-70 ${mobileAnimClass} filter neon-glow`}
          style={{ 
            opacity, 
            width: `${size}px`, 
            height: `${size}px`,
            filter: isMobile 
              ? 'drop-shadow(0 0 5px #ff0a6c) drop-shadow(0 0 8px #ff0a6c)' 
              : 'drop-shadow(0 0 5px #ff0a6c) drop-shadow(0 0 10px #ff0a6c)'
          }}
        >
          {shape}
        </div>
      );
    }
    
    return shapes;
  };
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black"
    >
      {/* Enhanced radial gradient background with pulse animation */}
      <div className={`absolute inset-0 bg-gradient-radial from-[#2a0215] to-black ${isMobile ? 'animate-pulse-slow' : ''}`}></div>
      
      {/* Animated shapes */}
      {renderShapes()}
      
      {/* Centered Squid Game soldier with enhanced mobile animation and INCREASED SIZE */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img 
          src="/squid-soldier.png" 
          alt="Squid Game Soldier" 
          className={`${isMobile ? 'w-64' : 'w-80'} h-auto opacity-90 filter ${isMobile ? 'animate-neon-pulse' : ''}`}
          style={{ 
            filter: isMobile
              ? 'drop-shadow(0 0 15px rgba(255, 10, 108, 0.8))'
              : 'drop-shadow(0 0 15px rgba(255, 10, 108, 0.8))'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
