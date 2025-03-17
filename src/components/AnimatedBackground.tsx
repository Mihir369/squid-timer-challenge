
import React, { useEffect, useRef, useState } from 'react';
import { Triangle, Circle, Square } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  
  // Reduce number of shapes on mobile to improve performance
  const TOTAL_SHAPES = isMobile ? 10 : 30;
  
  useEffect(() => {
    // Detect low-power devices based on frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    let lowPerformanceDetected = false;
    
    const checkPerformance = () => {
      const now = performance.now();
      frameCount++;
      
      if (now - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = now;
        
        // If FPS is consistently low, enable low power mode
        if (fps < 30 && !lowPerformanceDetected) {
          lowPerformanceDetected = true;
          setIsLowPowerMode(true);
        }
      }
      
      if (!lowPerformanceDetected) {
        requestAnimationFrame(checkPerformance);
      }
    };
    
    // Only run performance check on mobile devices
    if (isMobile) {
      requestAnimationFrame(checkPerformance);
    }
    
    // Initialize shape positions
    const container = containerRef.current;
    if (!container) return;
    
    const shapes = container.querySelectorAll('.animated-shape');
    
    shapes.forEach((shape) => {
      // Set random initial positions with reduced animation complexity for mobile
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const scale = isMobile ? 0.2 + Math.random() * 0.8 : 0.2 + Math.random() * 1.5;
      const duration = isMobile ? 15 + Math.random() * 10 : 10 + Math.random() * 20;
      const delay = Math.random() * -20;
      const zIndex = Math.floor(Math.random() * 10);
      
      const element = shape as HTMLElement;
      element.style.left = `${xPos}%`;
      element.style.top = `${yPos}%`;
      element.style.transform = `scale(${scale})`;
      element.style.animationDuration = `${duration}s`;
      element.style.animationDelay = `${delay}s`;
      element.style.zIndex = `${zIndex}`;
      
      // Add will-change property to optimize rendering performance
      element.style.willChange = 'transform';
    });
    
    // Clean up animation frames
    return () => {
      lowPerformanceDetected = true;
    };
  }, [isMobile]);
  
  const renderShapes = () => {
    // Render fewer shapes in low power mode
    const shapesToRender = isLowPowerMode ? Math.floor(TOTAL_SHAPES / 2) : TOTAL_SHAPES;
    const shapes = [];
    
    for (let i = 0; i < shapesToRender; i++) {
      const shapeType = i % 3;
      const opacity = isMobile ? 0.5 + Math.random() * 0.3 : 0.7 + Math.random() * 0.3; 
      const size = isMobile ? 10 + Math.floor(Math.random() * 16) : 12 + Math.floor(Math.random() * 24);
      
      // Reduce filter complexity on mobile for better performance
      const filterStyle = isMobile 
        ? 'drop-shadow(0 0 3px #ff0a6c)'
        : 'drop-shadow(0 0 5px #ff0a6c) drop-shadow(0 0 10px #ff0a6c)';
      
      // Determine which shape to render with neon glow effect
      let shape;
      if (shapeType === 0) {
        shape = <Triangle className="w-full h-full text-squid-pink" />;
      } else if (shapeType === 1) {
        shape = <Circle className="w-full h-full text-squid-pink" />;
      } else {
        shape = <Square className="w-full h-full text-squid-pink" />;
      }
      
      // Use a simpler animation class for mobile
      const animationClass = isMobile ? "animated-shape-simple" : "animate-float-3d";
      
      shapes.push(
        <div
          key={i}
          className={`animated-shape absolute opacity-70 ${animationClass}`}
          style={{ 
            opacity, 
            width: `${size}px`, 
            height: `${size}px`,
            filter: filterStyle,
            willChange: 'transform, opacity',
          }}
        >
          {shape}
        </div>
      );
    }
    
    return shapes;
  };
  
  // For extremely low-powered devices, use a simplified background
  if (isLowPowerMode && isMobile) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black">
        <div className="absolute inset-0 bg-gradient-radial from-[#2a0215] to-black"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img 
            src="/squid-soldier.png" 
            alt="Squid Game Soldier" 
            className="w-48 h-auto opacity-90"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 10, 108, 0.6))' }}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-black"
    >
      {/* Dark radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#2a0215] to-black"></div>
      
      {/* Animated shapes */}
      {renderShapes()}
      
      {/* Centered Squid Game soldier - smaller on mobile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img 
          src="/squid-soldier.png" 
          alt="Squid Game Soldier" 
          className={`${isMobile ? 'w-48' : 'w-64'} h-auto opacity-90`}
          style={{ 
            filter: isMobile 
              ? 'drop-shadow(0 0 8px rgba(255, 10, 108, 0.6))' 
              : 'drop-shadow(0 0 15px rgba(255, 10, 108, 0.8))'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
