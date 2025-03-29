import { Link } from 'wouter';

const BlogCard = ({ blog }) => {
  // Ensure blog data is available
  if (!blog) return null;
  
  const { id, title, excerpt, imageUrl, date, author, country, region } = blog;
  
  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <article className="blog-card">
      {/* Blog Image */}
      <Link href={`/blog/${id}`} className="blog-card-image-container">
        <img 
          src={imageUrl} 
          alt={`Flag of ${country}`} 
          className="blog-card-image"
        />
        <div className="blog-card-category">
          {region || 'Travel'}
        </div>
      </Link>
      
      {/* Blog Content */}
      <div className="blog-card-content">
        <Link href={`/blog/${id}`} className="blog-card-title-link">
          <h2 className="blog-card-title">{title}</h2>
        </Link>
        
        <p className="blog-card-excerpt">{excerpt}</p>
        
        <div className="blog-card-metadata">
          {/* Author Info */}
          <div className="blog-card-author">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="author-avatar"
            />
            <div className="author-info">
              <span className="author-name">{author.name}</span>
              <span className="blog-date">{formatDate(date)}</span>
            </div>
          </div>
          
          {/* Read More Link */}
          <Link href={`/blog/${id}`} className="read-more-link">
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;