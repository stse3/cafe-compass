require('dotenv').config({ path: '../../.env' });

module.exports = {
  // Server port (use environment variable with fallback)
  port: process.env.PORT || 3000,
  
  // Node environment
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS settings
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
};