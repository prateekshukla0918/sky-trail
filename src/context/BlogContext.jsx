import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

// Create Blog Context
const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  // States for blog data and UI control
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryLoading, setCountryLoading] = useState(false);
  const [error, setError] = useState(null);

  // Authors for blogs - memoized to prevent re-creation on each render
  const authors = useMemo(() => [
    {
      name: 'Marie Dubois',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      bio: 'Travel writer and photographer based in Lyon. Loves exploring urban cultures and architectural wonders.'
    },
    {
      name: 'Takeshi Yamada',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Cultural historian and travel enthusiast. Passionate about sharing traditions with the world.'
    },
    {
      name: 'Daniel Kimani',
      avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
      bio: 'Wildlife conservationist with 15 years of experience in national parks.'
    },
    {
      name: 'Isabella Santos',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      bio: 'Environmental scientist specializing in ecosystems and indigenous cultures.'
    },
    {
      name: 'Elena Papadopoulos',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
      bio: 'Travel writer and photographer specializing in destinations and cultures.'
    },
    {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
      bio: 'Travel photographer and outdoor enthusiast. Specializes in landscapes and wildlife.'
    }
  ], []);

  // Commenters for blog posts - memoized
  const commenters = useMemo(() => [
    { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sophie Martin', avatar: 'https://randomuser.me/api/portraits/women/41.jpg' },
    { name: 'Emily Chen', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { name: 'Robert Wilson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }
  ], []);

  // Generate random comments - memoized callback
  const generateComment = useCallback((id, authorIndex) => {
    const commenter = commenters[authorIndex % commenters.length];
    
    return {
      id: id.toString(),
      author: {
        name: commenter.name,
        avatar: commenter.avatar,
      },
      content: 'This is a fascinating article! I would love to visit this country someday.',
      date: new Date().toISOString().split('T')[0],
      likes: Math.floor(Math.random() * 25) + 1,
    };
  }, [commenters]);

  // Fetch all countries data from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,languages,currencies,timezones');
        
        if (!response.ok) {
          throw new Error(`Error fetching countries: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Create blog posts from fetched countries
        const blogPosts = data.slice(0, 20).map((country, index) => {
          const authorIndex = index % authors.length;
          const author = authors[authorIndex];
          
          // Generate 1-3 comments for each blog
          const numComments = Math.floor(Math.random() * 3) + 1;
          const comments = [];
          
          for (let i = 0; i < numComments; i++) {
            comments.push(generateComment(`${index}${i}`, (authorIndex + i) % commenters.length));
          }
          
          return {
            id: (index + 1).toString(),
            title: `Exploring the beauty of ${country.name.common}`,
            content: `Discover the unique culture, breathtaking landscapes, and rich history of ${country.name.common}. 
                     This amazing country in ${country.region} offers travelers an unforgettable experience with its 
                     ${country.capital && country.capital.length > 0 ? country.capital[0] : 'capital city'} serving as a gateway to adventure. 
                     From local cuisine to natural wonders, there's something for everyone in this remarkable destination.`,
            excerpt: `Discover the wonders of ${country.name.common} through a traveler's eyes.`,
            imageUrl: country.flags.png,
            date: new Date(Date.now() - (index * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            country: country.name.common,
            region: country.region,
            author: author,
            comments: comments
          };
        });
        
        setBlogs(blogPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching country data:', err);
        setError('Failed to fetch countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountries();
  }, [authors, commenters, generateComment]);

  // Function to fetch a specific country's data - memoized callback
  const fetchCountryData = useCallback(async (countryName) => {
    // Only fetch if we don't already have this country data
    if (selectedCountry && selectedCountry.name.common === countryName) {
      return;
    }
    
    setCountryLoading(true);
    
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch country data: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setSelectedCountry(data[0]);
      } else {
        setError('No country data found');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching country data:', err);
    } finally {
      setCountryLoading(false);
    }
  }, [selectedCountry]);

  // Function to select a blog by ID - memoized callback
  const selectBlogById = useCallback((id) => {
    const blog = blogs.find(blog => blog.id === id);
    setSelectedBlog(blog || null);
    
    if (blog) {
      fetchCountryData(blog.country);
    }
  }, [blogs, fetchCountryData]);

  // Context value to be provided - memoized to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    blogs,
    selectedBlog,
    selectedCountry,
    searchQuery,
    selectedRegion,
    loading,
    countryLoading,
    error,
    setSelectedBlog,
    selectBlogById,
    setSearchQuery,
    setSelectedRegion,
    fetchCountryData
  }), [
    blogs, 
    selectedBlog, 
    selectedCountry, 
    searchQuery, 
    selectedRegion, 
    loading, 
    countryLoading,
    error, 
    selectBlogById, 
    fetchCountryData
  ]);
  
  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to use the blog context
export const useBlogContext = () => useContext(BlogContext);