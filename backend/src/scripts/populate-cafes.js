require('dotenv').config({ path: '../../.env' }); // Adjust path as needed
const { getNearbyCafes } = require('../services/google-places-service.js');
const pool = require("../config/db.config.js");

const targetLocations = [
  { lat: 43.6532, lng: -79.3832, name: 'Toronto' },
  // Add more locations as needed
];

// Transform Google Place data to match your database schema
const transformPlaceData = (placeDetails) => {
    return {
      name: placeDetails.displayName?.text || 'Unknown',
      address: placeDetails.formattedAddress || '',
      latitude: placeDetails.location?.latitude || 0,
      longitude: placeDetails.location?.longitude || 0,
      description: '', // Empty for now
      google_place_id: placeDetails.id || null
    };
  };
  
  // Insert cafe into the database
  const insertCafe = async (cafeData) => {
    const client = await pool.connect();
    try {
      // Check if the cafe already exists
      const checkQuery = `
        SELECT id FROM cafes WHERE google_place_id = $1;
      `;
      const checkResult = await client.query(checkQuery, [cafeData.google_place_id]);
  
      // If the cafe already exists, return the existing id
      if (checkResult.rows.length > 0) {
        console.log(`Cafe with google_place_id ${cafeData.google_place_id} already exists.`);
        return checkResult.rows[0].id;
      }
  
      // If the cafe doesn't exist, perform the insert
      const insertQuery = `
        INSERT INTO cafes (name, address, latitude, longitude, google_place_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;
      
      const values = [
        cafeData.name,
        cafeData.address,
        cafeData.latitude,
        cafeData.longitude,
        cafeData.google_place_id
      ];
      
      const result = await client.query(insertQuery, values);
  
      // Return the inserted cafe's id
      return result.rows[0].id;
    } catch (error) {
      console.error("Error inserting cafe: ", error);
      throw error;
    } finally {
      client.release();
    }
  };
  
// Main function to populate database
const populateDatabase = async () => {
  // Process each target location
  for (const location of targetLocations) {
    console.log(`Searching cafes near ${location.name}...`);
    try {
      // Get nearby cafes
      const nearbyResults = await getNearbyCafes(location.lat, location.lng);
      
      // Check if the places property exists in the response
      if (!nearbyResults.places || !Array.isArray(nearbyResults.places)) {
        console.error(`Invalid response format for ${location.name}:`, nearbyResults);
        continue;
      }
      
      console.log(`Found ${nearbyResults.places.length} cafes near ${location.name}`);
      
      // Process each cafe (limit to 10 for testing)
      for (let i = 0; i < Math.min(20, nearbyResults.places.length); i++) {
        const placeDetails = nearbyResults.places[i];
        
        if (placeDetails) {
          // Transform data
          const cafeData = transformPlaceData(placeDetails);
          
          // Insert into database
          const cafeId = await insertCafe(cafeData);
          console.log(`Inserted cafe: ${cafeData.name} (ID: ${cafeId})`);
          
          // Add delay to avoid hitting rate limits
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    } catch (error) {
      console.error(`Error processing location ${location.name}:`, error);
    }
  }
  
  console.log(`Database population completed!`);
  pool.end(); // Close DB connection
};

// Run the script
populateDatabase().catch(console.error);