
import React, { useEffect, useRef } from 'react';
import { Triangle, Circle, Square } from 'lucide-react';

const TOTAL_SHAPES = 15;

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
      const scale = 0.5 + Math.random() * 1.5;
      const duration = 15 + Math.random() * 30;
      const delay = Math.random() * -30;
      
      const element = shape as HTMLElement;
      element.style.left = `${xPos}%`;
      element.style.top = `${yPos}%`;
      element.style.transform = `scale(${scale})`;
      element.style.animationDuration = `${duration}s`;
      element.style.animationDelay = `${delay}s`;
    });
  }, []);
  
  const renderShapes = () => {
    const shapes = [];
    
    for (let i = 0; i < TOTAL_SHAPES; i++) {
      const shapeType = i % 3;
      const opacity = 0.1 + Math.random() * 0.2;
      
      // Determine which shape to render
      let shape;
      if (shapeType === 0) {
        shape = <Circle className="w-full h-full text-squid-red" />;
      } else if (shapeType === 1) {
        shape = <Triangle className="w-full h-full text-squid-pink" />;
      } else {
        shape = <Square className="w-full h-full text-squid-teal" />;
      }
      
      shapes.push(
        <div
          key={i}
          className="animated-shape absolute w-16 h-16 opacity-20 animate-float-3d"
          style={{ opacity }}
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
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {renderShapes()}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img 
          src="/squid-soldier.png" 
          alt="Squid Game Soldier" 
          className="w-80 h-auto opacity-60 animate-pulse-slow"
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
