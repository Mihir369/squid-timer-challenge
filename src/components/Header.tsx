
import React, { useState, useEffect } from "react";
import { Triangle, Circle, Square, AlertTriangle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-black/90 backdrop-blur-md"
          : "py-6 bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex space-x-2 items-center">
              <AlertTriangle className="h-6 w-6 text-squid-red" />
              <Circle className="h-6 w-6 text-squid-teal" />
              <Square className="h-6 w-6 text-squid-red" />
            </div>
            <Link to="/" className="flex items-center ml-2">
              <div className="flex items-center bg-gradient-to-r from-squid-red to-squid-pink p-1 rounded-md">
                <Sparkles className="h-5 w-5 text-white mr-1" />
                <span className="text-xl font-black font-archivo tracking-tighter text-white">INGENIOUS</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-squid-red transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-squid-red transition-colors"
            >
              About
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-squid-red transition-colors"
            >
              Register
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-squid-red transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Link to="/register" className="squid-btn-primary">
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
