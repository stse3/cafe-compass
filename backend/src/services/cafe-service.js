const pool = require('../config/db.config.js');

const findCafesNearLocation = async (lat,lng,radius,limit) => {
  try{
    //using postgreSQL's earthdistance extension we can earthdistance extension
    const query = `
    SELECT *, 
    (point(longitude, latitude) <@> point($2, $1)) * 1609.34 as distance
    FROM cafes
    WHERE (point(longitude, latitude) <@> point($2, $1)) * 1609.34 < $3
    ORDER BY distance
    LIMIT $4
  `;
    const result = await pool.query (query, [lat,lng,radius,limit]);
    return result.rows;

  }catch(error){
    console.error('Database error finding nearby cafes: ', error);
    throw error;
  }
}

const findCafeDetails = async (cafeId) => {
  try {
    //checks if its a google places cafe or a local cafe ID 
    checkGooglePlaceId = cafeId.startsWith('ChIJ');
    const query = checkGooglePlaceId ? `SELECT * FROM cafes WHERE google_place_id = $1` : `SELECT * FROM cafes WHERE id = $1`;
    const reuslt = await pool.query (query, [cafeId]);
    if (result.rows.length === 0) {
      throw new Error('Cafe not found');
    }

  }catch (error){
    console.error('Database error finding cafe details: ', error);
    throw error;
  }
}

const cafeService = {
  findCafesNearLocation,
  findCafeDetails

};

module.exports = cafeService;