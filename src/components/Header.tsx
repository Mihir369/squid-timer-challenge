
import React, { useState, useEffect } from 'react';
import { Triangle, Circle, Square } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-squid-dark/80 backdrop-blur-md shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex space-x-2 items-center">
              <Triangle className="h-6 w-6 text-squid-pink" />
              <Circle className="h-6 w-6 text-squid-teal" />
              <Square className="h-6 w-6 text-squid-pink" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter ml-2">SQUID CHALLENGE</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-squid-pink transition-colors">Home</a>
            <a href="#about" className="text-white hover:text-squid-pink transition-colors">About</a>
            <a href="#register" className="text-white hover:text-squid-pink transition-colors">Register</a>
            <a href="#contact" className="text-white hover:text-squid-pink transition-colors">Contact</a>
          </nav>
          
          <button className="squid-btn-primary">
            Join Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
