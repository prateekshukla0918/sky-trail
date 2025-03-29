import { Link } from 'wouter';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Header />
      
      <div className="not-found-container">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-message">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link href="/" className="not-found-button">
          <span className="not-found-button-icon">←</span>
          <span>Return Home</span>
        </Link>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;