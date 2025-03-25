
import React, { useState, useEffect } from "react";
import {
  Triangle,
  Circle,
  Square,
  AlertTriangle,
  Shield,
  Menu,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

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
    
    // Add event listener for storage changes to detect admin login/logout in other tabs
    const handleStorageChange = () => {
      const isAdmin = localStorage.getItem("adminAuth") === "true";
      setShowAdminLink(isAdmin);
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Add a debug log to check if showAdminLink is set correctly
  console.log("showAdminLink:", showAdminLink);

  const isActive = (path: string) => {
    return location.pathname === path 
      ? "text-squid-red" 
      : "text-white hover:text-squid-red";
  };

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-black/90 backdrop-blur-md"
          : "py-3 md:py-6 bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex space-x-2 items-center">
              <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-squid-red" />
              <Circle className="h-5 w-5 md:h-6 md:w-6 text-squid-teal" />
              <Square className="h-5 w-5 md:h-6 md:w-6 text-squid-red" />
            </div>
            <Link to="/" className="flex items-center ml-2">
              <div className="flex items-center">
                <span className="text-lg md:text-xl font-black font-archivo tracking-tighter text-white">
                  INGENIOUS
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Join Now Button - ADDED TO MOBILE NAV */}
            <Link to="/register" className="squid-btn-primary py-1.5 px-3 text-sm">
              Join Now
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="text-white p-1" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
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

          {/* Desktop Call-to-action */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/register" className="squid-btn-primary text-sm md:text-base">
              Join Now
            </Link>
            <Link 
              to="/admin" 
              className="squid-btn-outline text-xs md:text-sm flex items-center"
              aria-label="Admin Access"
            >
              <Shield className="w-4 h-4" />
              <span className="ml-1 hidden md:inline">Admin</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-black/90 backdrop-blur-md rounded-lg p-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`transition-colors ${isActive('/')} py-2`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`transition-colors ${isActive('/about')} py-2`}
              >
                About
              </Link>
              <Link
                to="/register"
                className={`transition-colors ${isActive('/register')} py-2`}
              >
                Register
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${isActive('/contact')} py-2`}
              >
                Contact
              </Link>
              <Link
                to="/admin"
                className={`transition-colors flex items-center ${isActive('/admin')} py-2`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
