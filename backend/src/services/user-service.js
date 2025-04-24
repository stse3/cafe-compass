
const pool = require('../config/db.config.js');

const getUserById = async (userId) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    try {
      const {rows} = await pool.query(query, values);
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error getting user by ID');
      throw error;
    }
  }
  
  const getUserByGoogleId = async (googleId) => {
    const query = 'SELECT * FROM users WHERE google_id = $1'; // Get all fields, not just id
    const values = [googleId];
    try {
      const {rows} = await pool.query(query, values);
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking for user by Google ID');
      throw error;
    }
  }

  const addUser = async (name, email, photoUrl, googleId) => {
    // Use RETURNING id to get the UUID that PostgreSQL generates
    const query = 'INSERT INTO users (name, email, photo_url, google_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, photoUrl, googleId];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the full user object
    } catch (error) {
      console.error('Error inserting new user into database');
      throw error;
    }
  }

const deleteUser = async (userId) => {
    const query = 'DELETE FROM users WHERE id=$1'
    const  values = [userId];
    try {
        await pool.query(query,values);
    }catch (error){
        console.error("Error deleting this user from the database");
        throw error;
    }

}


const userService = {
    getUserByGoogleId,
    getUserById,
    addUser,
    deleteUser,

}
module.exports = userService;