
import React, { useState, useEffect } from "react";
import {
  Triangle,
  Circle,
  Square,
  AlertTriangle,
  Sparkles,
  Shield,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Check if user is admin (has previously authenticated)
    const isAdmin = localStorage.getItem("adminAuth") === "true";
    setShowAdminLink(isAdmin);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path 
      ? "text-squid-red" 
      : "text-white hover:text-squid-red";
  };

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
              <div className="flex items-center">
                <span className="text-xl font-black font-archivo tracking-tighter text-white">
                  INGENIOUS
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${isActive('/about')}`}
            >
              About
            </Link>
            <Link
              to="/register"
              className={`transition-colors ${isActive('/register')}`}
            >
              Register
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${isActive('/contact')}`}
            >
              Contact
            </Link>
            {showAdminLink && (
              <Link
                to="/admin"
                className={`transition-colors flex items-center ${isActive('/admin')}`}
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/register" className="squid-btn-primary">
              Join Now
            </Link>
            {showAdminLink && (
              <Link 
                to="/admin" 
                className="squid-btn-outline text-sm md:hidden"
                aria-label="Admin Panel"
              >
                <Shield className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
