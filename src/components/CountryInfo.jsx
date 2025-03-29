import { useBlogContext } from '../context/BlogContext';
import { useEffect } from 'react';

const CountryInfo = ({ countryName }) => {
  const { selectedCountry, countryLoading, error, fetchCountryData } = useBlogContext();
  
  // Fetch country data when component mounts or countryName changes
  useEffect(() => {
    if (countryName) {
      fetchCountryData(countryName);
    }
  }, [countryName, fetchCountryData]);
  
  // Render loading state
  if (countryLoading) {
    return (
      <div className="country-info-loading">
        <div className="loading-spinner"></div>
        <p>Loading country information...</p>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="country-info-error">
        <div className="error-icon">⚠️</div>
        <p>Failed to load country information: {error}</p>
      </div>
    );
  }
  
  // Render empty state if no country data
  if (!selectedCountry) {
    return (
      <div className="country-info-empty">
        <p>No country information available.</p>
      </div>
    );
  }
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : 'N/A';
  };
  
  // Format languages from object to string
  const formatLanguages = (languages) => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };
  
  // Format currencies from object to string
  const formatCurrencies = (currencies) => {
    if (!currencies) return 'N/A';
    
    return Object.entries(currencies)
      .map(([code, currency]) => `${currency.name} (${currency.symbol || code})`)
      .join(', ');
  };
  
  return (
    <div className="country-info">
      {/* Country Header */}
      <div className="country-header">
        <img 
          src={selectedCountry.flags.png} 
          alt={selectedCountry.flags.alt || `Flag of ${selectedCountry.name.common}`}
          className="country-flag"
        />
        <div className="country-name-container">
          <h2 className="country-name">{selectedCountry.name.common}</h2>
          <p className="country-official-name">{selectedCountry.name.official}</p>
        </div>
      </div>
      
      {/* Country Details */}
      <div className="country-details">
        {/* Capital */}
        <div className="country-detail-item">
          <span className="detail-label">Capital:</span>
          <span className="detail-value">
            {selectedCountry.capital && selectedCountry.capital.length > 0 
              ? selectedCountry.capital.join(', ') 
              : 'N/A'}
          </span>
        </div>
        
        {/* Region and Subregion */}
        <div className="country-detail-item">
          <span className="detail-label">Region:</span>
          <span className="detail-value">
            {selectedCountry.region}
            {selectedCountry.subregion ? `, ${selectedCountry.subregion}` : ''}
          </span>
        </div>
        
        {/* Population */}
        <div className="country-detail-item">
          <span className="detail-label">Population:</span>
          <span className="detail-value">{formatNumber(selectedCountry.population)}</span>
        </div>
        
        {/* Languages */}
        <div className="country-detail-item">
          <span className="detail-label">Languages:</span>
          <span className="detail-value">{formatLanguages(selectedCountry.languages)}</span>
        </div>
        
        {/* Currencies */}
        <div className="country-detail-item">
          <span className="detail-label">Currencies:</span>
          <span className="detail-value">{formatCurrencies(selectedCountry.currencies)}</span>
        </div>
        
        {/* Timezones */}
        <div className="country-detail-item">
          <span className="detail-label">Timezones:</span>
          <span className="detail-value">
            {selectedCountry.timezones && selectedCountry.timezones.length > 0 
              ? selectedCountry.timezones.join(', ') 
              : 'N/A'}
          </span>
        </div>
        
        {/* Continents */}
        <div className="country-detail-item">
          <span className="detail-label">Continents:</span>
          <span className="detail-value">
            {selectedCountry.continents && selectedCountry.continents.length > 0 
              ? selectedCountry.continents.join(', ') 
              : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;