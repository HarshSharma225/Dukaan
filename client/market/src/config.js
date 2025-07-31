// Configuration for API URLs
const config = {
  // Development environment
  development: {
    apiUrl: 'https://dukaan-4.onrender.com'
  },
  // Production environment
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://your-backend-domain.onrender.com'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate configuration
export const API_BASE_URL = config[environment].apiUrl; 