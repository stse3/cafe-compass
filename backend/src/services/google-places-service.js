const axios = require('axios');
const {googleConfig} = require("../config/google.config");

const getNearbyCafes = async (
    latitude,
    longitude,
    radius = 500.0, // Default radius is 500 meters
    maxResultCount = 20
  ) => {
    const apiUrl = `https://places.googleapis.com/v1/places:searchNearby`;
    
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googleConfig.apiKey,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location.latitude,places.location.longitude,places.rating,places.priceLevel,places.id',  // Fields you want to retrieve
    };
  
    const body = {
      includedTypes: ['cafe', 'coffee_shop'], // Type of places you are looking for (adjust as needed)
      maxResultCount: maxResultCount,
      locationRestriction: {
        circle: {
          center: {
            latitude: latitude,
            longitude: longitude
          },
          radius: radius
        }
      }
    };
  
    try {
      const response = await axios.post(apiUrl, body, {
        headers: headers,
        timeout: googleConfig.timeout // Adjust timeout as needed
      });
  
      if (response.status !== 200) {
        throw new Error(`Google API error: ${response.statusText}`);
      }
  
      return response.data;
  
    } catch (error) {
      // Handle API error responses
      if (error.response) {
        console.error('Google Places API error:', {
          status: error.response.status,
          data: error.response.data
        });
  
        if (error.response.status === 400) {
          throw new Error('Invalid request parameters. Check latitude, longitude, and radius values.');
        } else if (error.response.status === 403) {
          throw new Error('API key invalid or Places API not enabled for this key.');
        } else if (error.response.status === 429) {
          throw new Error('API quota exceeded. Try again later.');
        }
      } else if (error.request) {
        console.error('No response received from Google Places API:', error.request);
        throw new Error('No response received from Google Places API. Check your network connection.');
      }
  
      console.error('Error fetching nearby places:', error.message);
      throw new Error(`Failed to fetch nearby places: ${error.message}`);
    }
  };
  //go back and fix this later 
const getPlaceDetails = async (placeId) => {
  const apiUrl = `${googleConfig.baseUrl}/places/${placeId}`;
  
  const headers = {
    'X-Goog-Api-Key': googleConfig.apiKey,
    'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,userRatingCount,priceLevel,types,businessStatus,photos,openingHours,websiteUri,internationalPhoneNumber,reviews'
  };

  try {
    const response = await axios.get(apiUrl, { 
      headers,
      timeout: googleConfig.timeout 
    });
    
    if (response.status !== 200) {
      throw new Error(`Google API error: ${response.statusText}`);
    }
    
    return response.data;
    
  } catch (error) {
    console.error(`Error fetching details for place ${placeId}:`, error.message);
    throw error;
  }
};

module.exports = { 
  getNearbyCafes,
  getPlaceDetails
};