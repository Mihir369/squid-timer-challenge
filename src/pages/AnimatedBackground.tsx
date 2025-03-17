
import React, { useEffect, useRef } from 'react';
import { Triangle, Circle, Square } from 'lucide-react';

const TOTAL_SHAPES = 30; // Increased number of shapes

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const shapes = container.querySelectorAll('.animated-shape');
    
    shapes.forEach((shape) => {
      // Set random initial positions
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const scale = 0.2 + Math.random() * 1.5; // Varied sizes
      const duration = 10 + Math.random() * 20; // Faster animations
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
  }, []);
  
  const renderShapes = () => {
    const shapes = [];
    
    for (let i = 0; i < TOTAL_SHAPES; i++) {
      const shapeType = i % 3;
      const opacity = 0.7 + Math.random() * 0.3; // Higher opacity for neon effect
      const size = 12 + Math.floor(Math.random() * 24); // More varied sizes
      
      // Determine which shape to render with neon glow effect
      let shape;
      if (shapeType === 0) {
        shape = <Triangle className="w-full h-full text-squid-pink" />;
      } else if (shapeType === 1) {
        shape = <Circle className="w-full h-full text-squid-pink" />;
      } else {
        shape = <Square className="w-full h-full text-squid-pink" />;
      }
      
      shapes.push(
        <div
          key={i}
          className="animated-shape absolute opacity-70 animate-float-3d filter neon-glow"
          style={{ 
            opacity, 
            width: `${size}px`, 
            height: `${size}px`,
            filter: 'drop-shadow(0 0 5px #ff0a6c) drop-shadow(0 0 10px #ff0a6c)'
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
      {/* Dark radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#2a0215] to-black"></div>
      
      {/* Animated shapes */}
      {renderShapes()}
      
      {/* Centered Squid Game soldier */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img 
          src="/squid-soldier.png" 
          alt="Squid Game Soldier" 
          className="w-64 h-auto opacity-90 filter"
          style={{ 
            filter: 'drop-shadow(0 0 15px rgba(255, 10, 108, 0.8))'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
