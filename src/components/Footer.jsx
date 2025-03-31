import { Link } from 'wouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo-section">
          <div className="footer-logo">
            <span className="footer-logo-text">Travelog</span>
          </div>
          <p className="footer-tagline">
            Explore the world through captivating travel stories and authentic cultural insights.
          </p>
        </div>
        
        {/* Destinations Section */}
        <div className="footer-section">
          <h3 className="footer-section-title">Destinations</h3>
          <div className="footer-links">
            <Link href="/" className="footer-link">Europe</Link>
            <Link href="/" className="footer-link">Asia</Link>
            <Link href="/" className="footer-link">Africa</Link>
            <Link href="/" className="footer-link">Americas</Link>
            <Link href="/" className="footer-link">Oceania</Link>
          </div>
        </div>
        
        {/* Categories Section */}
        <div className="footer-section">
          <h3 className="footer-section-title">Categories</h3>
          <div className="footer-links">
            <Link href="/" className="footer-link">Adventure</Link>
            <Link href="/" className="footer-link">Culture</Link>
            <Link href="/" className="footer-link">Food & Cuisine</Link>
            <Link href="/" className="footer-link">Photography</Link>
            <Link href="/" className="footer-link">Travel Tips</Link>
          </div>
        </div>
        
        {/* Company Section */}
        <div className="footer-section">
          <h3 className="footer-section-title">Company</h3>
          <div className="footer-links">
            <Link href="/" className="footer-link">About Us</Link>
            <Link href="/" className="footer-link">Contact</Link>
            <Link href="/" className="footer-link">Write for Us</Link>
            <Link href="/" className="footer-link">Privacy Policy</Link>
            <Link href="/" className="footer-link">Terms of Service</Link>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-section-title">Connect</h3>
          <div className="footer-contact-info">
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>prateekshukla@gmail.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span>+91 9925550708</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Kishora road, Sonipat</span>
            </div>
          </div>
          
          <div className="footer-social">
            <a href="#" className="social-link">
              <span className="social-icon">📘</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">📷</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">🐦</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">📱</span>
            </a>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Travelog. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link href="/" className="footer-bottom-link">Privacy</Link>
            <Link href="/" className="footer-bottom-link">Terms</Link>
            <Link href="/" className="footer-bottom-link">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;