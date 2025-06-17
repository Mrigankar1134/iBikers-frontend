import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determine if we're on a page with a light background
  const isLightPage = location.pathname === '/browse';

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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isLightPage && !scrolled ? 'light-page' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">!BIKERS</Link>
        
        <div 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/browse" onClick={() => setMobileMenuOpen(false)}>Browse</Link></li>
          <li><Link to="/browse" className="book-now-btn" onClick={() => setMobileMenuOpen(false)}>Book Now</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;