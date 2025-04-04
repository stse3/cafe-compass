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


const cafeService = {
  findCafesNearLocation

};

module.exports = cafeService;