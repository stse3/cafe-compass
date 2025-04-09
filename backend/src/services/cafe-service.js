const pool = require('../config/db.config.js');

const findCafesNearLocation = async (lat, lng, radius, limit, offset) => {
  try {
    // Using PostgreSQL's earthdistance extension
    const query = `
    SELECT *, 
    (point(longitude, latitude) <@> point($1, $2)) * 1609.34 as distance
    FROM cafes
    WHERE (point(longitude, latitude) <@> point($1, $2)) * 1609.34 < $3
    ORDER BY distance
    LIMIT $4 OFFSET $5
  `;
    const result = await pool.query(query, [lng, lat, radius, limit, offset]);
   
    return result.rows;

  } catch (error) {
    console.error('Database error finding nearby cafes: ', error);
    throw error;
  }
};

const findCafeDetails = async (cafeId, limit, offset) => {
  try {
    // Checks if it's a Google Places cafe or a local cafe ID
    if (!cafeId) {
      throw new Error('INVALID_ID');
    }
    const checkGooglePlaceId = cafeId.startsWith('ChIJ');
    const query = checkGooglePlaceId
      ? `SELECT * FROM cafes WHERE google_place_id = $1 LIMIT $2 OFFSET $3`
      : `SELECT * FROM cafes WHERE id = $1 LIMIT $2 OFFSET $3`;
    const result = await pool.query(query, [cafeId, limit, offset]);

    return result.rows[0]; // Return the first cafe found

  } catch (error) {
    console.error('Database error finding cafe details: ', error);
    throw error;
  }
};


const findSearchedCafes = async (name, address, sort, limit=10, lat, lng) => {

  try {
    if (!name && !address) {
      throw new Error('INVALID_SEARCH');
    }
    let queryText = `
    SELECT *
    ${lat && lng ? `, (point(longitude, latitude) <@> point($4, $5)) * 1609.34 as distance` : ''}
    FROM cafes
    WHERE ($1::text IS NULL OR name ILIKE '%' || $1::text || '%')
    AND ($2::text IS NULL OR address ILIKE '%' || $2::text || '%')
  `;
  
    // Handle sorting
    const sortOptions = {
      'name_asc': 'name ASC',
      'name_desc': 'name DESC',
      'address_asc': 'address ASC',
      'address_desc': 'address DESC',
      'distance_asc': 'distance ASC',
      'distance_desc': 'distance DESC'
    };
    // Add ORDER BY clause
    if (sort && sortOptions[sort]) {
      if (sort.includes('distance') && (!lat || !lng)) {
        
        throw new Error('COORDINATES_REQUIRED_FOR_DISTANCE');
      }
      queryText += ` ORDER BY ${sortOptions[sort]}`;
    } else {
      queryText += ` ORDER BY name ASC`;
    }

      queryText += ` LIMIT $3`;

      // Prepare query parameters
      const params = [
        name || null,
        address || null,
        parseInt(limit)
      ];

      // Add coordinates if provided
      if (lat && lng) {
        params.push(parseFloat(lng), parseFloat(lat));
      }

      console.log('Executing query:', { queryText, params }); // Debug log
      const result = await pool.query(queryText, params);
      return result.rows;

    } catch (error) {
      console.error('Database error in findSearchedCafes:', error);
      throw error;
    }

}
const cafeService = {
  findCafesNearLocation,
  findCafeDetails,
  findSearchedCafes

};

module.exports = cafeService;