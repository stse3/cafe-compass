require('dotenv').config({ path: '../../.env' }); // Adjust path as needed

// Configuration for Google Places API (new)
const googleConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  baseUrl: 'https://places.googleapis.com/v1',
  defaultRadius: 500.0, // Default search radius in meters
  defaultType: 'cafe', // Default establishment type to search for
};
module.exports = {googleConfig}
