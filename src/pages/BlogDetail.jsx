import { useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { useBlogContext } from '../context/BlogContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountryInfo from '../components/CountryInfo';
import CommentSection from '../components/CommentSection';

const BlogDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useLocation();
  const { selectedBlog, selectBlogById, loading, error } = useBlogContext();
  
  // Fetch blog when component mounts or id changes
  useEffect(() => {
    // Scroll to top when navigating to blog detail
    window.scrollTo(0, 0);
    
    if (id) {
      selectBlogById(id);
    }
  }, [id, selectBlogById]);
  
  // Format date for better readability - memoized to prevent recreation on each render
  const formatDate = useCallback((dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }, []);
  
  // Handle going back to blog list - memoized
  const handleBackClick = useCallback(() => {
    setLocation('/');
  }, [setLocation]);
  
  // Render loading state
  if (loading) {
    return (
      <div className="blog-detail-page">
        <Header />
        <div className="blog-detail-container">
          <div className="blog-detail-loading">
            <div className="loading-spinner"></div>
            <p>Loading blog content...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="blog-detail-page">
        <Header />
        <div className="blog-detail-container">
          <div className="blog-detail-error">
            <div className="error-icon">⚠️</div>
            <h2>Error loading blog</h2>
            <p>{error}</p>
            <button onClick={handleBackClick} className="back-button">
              ← Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Render not found state if blog doesn't exist
  if (!selectedBlog) {
    return (
      <div className="blog-detail-page">
        <Header />
        <div className="blog-detail-container">
          <div className="blog-detail-not-found">
            <h2>Blog Not Found</h2>
            <p>The blog you're looking for doesn't exist or has been removed.</p>
            <button onClick={handleBackClick} className="back-button">
              ← Back to Blogs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="blog-detail-page">
      <Header />
      
      <main className="blog-detail-container">
        {/* Back Button */}
        <div className="blog-detail-navigation">
          <button onClick={handleBackClick} className="back-button">
            ← Back to Blogs
          </button>
        </div>
        
        {/* Blog Header */}
        <div className="blog-detail-header">
          <h1 className="blog-detail-title">{selectedBlog.title}</h1>
          
          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <img 
                src={selectedBlog.author.avatar} 
                alt={selectedBlog.author.name} 
                className="author-avatar"
              />
              <div className="author-info">
                <span className="author-name">{selectedBlog.author.name}</span>
                <span className="blog-date">{formatDate(selectedBlog.date)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Country Flag Image */}
        <div className="blog-detail-image-container">
          <img 
            src={selectedBlog.imageUrl} 
            alt={`Flag of ${selectedBlog.country}`} 
            className="blog-detail-image"
          />
          <div className="image-caption">
            Flag of {selectedBlog.country}
          </div>
        </div>
        
        {/* Country Information */}
        <CountryInfo countryName={selectedBlog.country} />
        
        {/* Blog Content */}
        <div className="blog-detail-content">
          <p>{selectedBlog.content}</p>
          <p>
            Join us as we explore this beautiful country and discover its unique culture, 
            traditions, and landscape. From bustling cities to serene countryside, 
            {selectedBlog.country} offers something for every traveler.
          </p>
        </div>
        
        {/* Author Bio */}
        <div className="blog-detail-author-bio">
          <img 
            src={selectedBlog.author.avatar} 
            alt={selectedBlog.author.name} 
            className="author-bio-avatar"
          />
          <div className="author-bio-content">
            <h3 className="author-bio-name">About {selectedBlog.author.name}</h3>
            <p className="author-bio-text">{selectedBlog.author.bio}</p>
          </div>
        </div>
        
        {/* Related Articles - Could be implemented in the future */}
        <div className="blog-detail-related">
          <h3 className="related-title">You might also like</h3>
          {/* Related articles would go here */}
          <p className="related-coming-soon">More articles coming soon!</p>
        </div>
        
        {/* Comments Section */}
        <CommentSection comments={selectedBlog.comments} />
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;