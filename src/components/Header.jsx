import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useBlogContext } from '../context/BlogContext';

const Header = () => {
  const { searchQuery, setSearchQuery } = useBlogContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link href="/">
            <span className="logo-text">Travelog</span>
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        {isMobile && (
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
        
        {/* Navigation & Search - Hidden on mobile unless menu is open */}
        <div className={`header-nav ${isMobile && !menuOpen ? 'hidden' : ''}`}>
          {/* Navigation */}
          <nav>
            <ul className="nav-links">
              <li>
                <Link href="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link href="/" className="nav-link">Destinations</Link>
              </li>
              <li>
                <Link href="/" className="nav-link">About</Link>
              </li>
              <li>
                <Link href="/" className="nav-link">Contact</Link>
              </li>
            </ul>
          </nav>
          
          {/* Search Actions */}
          <div className="header-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button className="search-button">
                <span className="search-icon">🔍</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <div className="header-logo">
                <span className="logo-text">Travelog</span>
              </div>
              <button className="mobile-menu-close" onClick={toggleMenu}>
                ✕
              </button>
            </div>
            <ul className="mobile-nav-links">
              <li>
                <Link href="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
              </li>
              <li>
                <Link href="/" className="mobile-nav-link" onClick={toggleMenu}>Destinations</Link>
              </li>
              <li>
                <Link href="/" className="mobile-nav-link" onClick={toggleMenu}>About</Link>
              </li>
              <li>
                <Link href="/" className="mobile-nav-link" onClick={toggleMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
