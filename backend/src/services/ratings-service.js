const pool = require('../config/db.config.js');

//created_at, updated_at
//do i have to worry about the updated_at field? 
const createRating = async (cafeId, userId,overall_rating, wifi_rating, outlet_rating, seating_rating, review ) => {
    const query = 'INSERT INTO ratings (cafe_id, user_id, overall_rating, wifi_rating, outlet_rating, seating_rating, review) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [cafeId, userId, overall_rating, wifi_rating, outlet_rating, seating_rating, review]
    
    try {
        const result = await pool.query (query,values);
        return result.rows[0];

    }catch (error){
        console.error('Error creating new rating in the database: ',error);
        throw error;
    }


}
//gets all ratings for specific cafe by cafeId
const getCafeRatings = async (cafeId) =>{
    const query = 'SELECT * FROM ratings WHERE cafe_id = $1'
    const values = [cafeId];
    try {
        const result =await pool.query (query,values);
        return result.rows;
    }catch (error){
        console.error("Error retreiving reviews for this cafe", error);
        throw error;
    }
}

//gets the specific rating by the ID in ratings database
const getRatingById = async (id) => {
    const query = 'SELECT * FROM ratings WHERE id=$1 '
    const values = [id]
    try{
        const result = await pool.query (query,valeus);
        return result.rows;
    }catch (error){
        console.error("Error retrieving this rating: ",error);
        throw error;
    }
}

//adjust updated_at,
const updateRating = async (id, overall_rating, wifi_rating, outlet_rating, seating_rating, review) =>{
    const query = `
    UPDATE ratings
    SET overall_rating=$1, wifi_rating=$2, oulet_rating=$3, seating_rating=$4, review=$5, updated_at=$6
    WHERE id=$6
    RETURNING *
    `
    const values = [overall_rating, wifi_rating, outlet_rating, seating_rating, review,id];
    try{
        const result = await pool.query(query,values);
        return result.rows[0];
    }catch (error){
        console.error("Error updating your rating: ",error);
    }


}
