import { useEffect, useState } from 'react';
import { useBlogContext } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogList = () => {
  const { blogs, searchQuery, selectedRegion, setSelectedRegion, loading, error } = useBlogContext();
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [regions, setRegions] = useState([]);
  
  // Extract unique regions from blogs and sort them
  useEffect(() => {
    if (blogs.length > 0) {
      const uniqueRegions = [...new Set(blogs.map(blog => blog.region))].filter(Boolean).sort();
      setRegions(uniqueRegions);
    }
  }, [blogs]);
  
  // Filter blogs based on search query and selected region
  useEffect(() => {
    let filtered = [...blogs];
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query) || 
        blog.content.toLowerCase().includes(query) || 
        blog.country.toLowerCase().includes(query)
      );
    }
    
    // Apply region filter
    if (selectedRegion) {
      filtered = filtered.filter(blog => blog.region === selectedRegion);
    }
    
    setFilteredBlogs(filtered);
  }, [blogs, searchQuery, selectedRegion]);
  
  // Handle region selection
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="blog-list-page">
        <Header />
        <div className="blog-list-container">
          <div className="blog-list-loading">
            <div className="loading-spinner"></div>
            <p>Loading blogs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="blog-list-page">
        <Header />
        <div className="blog-list-container">
          <div className="blog-list-error">
            <div className="error-icon">⚠️</div>
            <h2>Error loading blogs</h2>
            <p>{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="blog-list-page">
      <Header />
      
      <main className="blog-list-container">
        {/* Hero Section */}
        <section className="blog-list-hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Explore Our World's <span className="highlight">Amazing Destinations</span>
            </h1>
            <p className="hero-subtitle">
              Discover fascinating cultures, breathtaking landscapes, and unforgettable experiences from around the globe.
            </p>
          </div>
        </section>
        
        {/* Filters Section */}
        <section className="blog-filters">
          <div className="filter-section">
            <h2 className="filter-title">Destination Blogs</h2>
            <div className="region-filter">
              <label htmlFor="region-select">Filter by Region:</label>
              <select 
                id="region-select" 
                value={selectedRegion} 
                onChange={handleRegionChange}
                className="region-select"
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {searchQuery && (
            <div className="search-results-info">
              <p>
                Showing results for "{searchQuery}"
                {selectedRegion && ` in ${selectedRegion}`}
                {` (${filteredBlogs.length} ${filteredBlogs.length === 1 ? 'blog' : 'blogs'})`}
              </p>
            </div>
          )}
        </section>
        
        {/* Blog Cards Grid */}
        {filteredBlogs.length > 0 ? (
          <section className="blog-grid">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
        ) : (
          <div className="blog-list-empty">
            <h3>No blogs found</h3>
            <p>
              {searchQuery || selectedRegion
                ? 'Try adjusting your search or filters to find more blogs.'
                : 'Check back soon for new content!'}
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogList;