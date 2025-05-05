const pool = require('../config/db.config.js')

const saveCafeToNotebook = async (userID, cafeID,title,note, media, visited_at, is_journal_entry) => {
    const query = 'INSERT INTO notebook (user_id,cafe_id, title, note, media, visited_at, is_journal_entry) VALUES ($1,$2, $3, $4, $5, $6, $7)RETURNING * '
    const values = [userID, cafeID,title, note, media, visited_at, is_journal_entry];
    try {
        const result = await pool.query(query,values);
        return result.rows[0];
    }catch (error){
        console.error('Error saving cafe')
        throw error;
    }
} 

const removeSavedCafe = async (userID, cafeID) => {
    const query = 'DELETE FROM notebook WHERE user_id=$1 AND cafe_id=$2 RETURNING * '
    const values =[userID, cafeID];
    try {
        const result = await pool.query(query,values);
        return result.rows[0];
    }catch(error){
        console.error("Error deleting user's saved cafe")
        throw error;
    }
}
 
const updateNotebookNote = async (userID, cafeID, title, note,media, visited_at, is_journal_entry)=> {
    const query = `
    UPDATE notebook
    SET title=$1, note=$2, media=$3, visited_at=$4, is_journal_entry=$5, updated_at = NOW()
    WHERE user_id=$6 AND cafe_id=$7
    RETURNING *
`;

    const values = [title, note, media, visited_at, is_journal_entry, userID, cafeID];
    try {
        const result = await pool.query(query,values);
        return result.rows[0];
    }catch (error){
        console.error("Error adding a note to user's saved cafe");
        throw error;
    }
}

const getUserNotebook = async (userID) => {
    const query = 'SELECT user_id, cafe_id, title, note, media, visited_at, is_journal_entry, updated_at FROM notebook WHERE user_id = $1';
    
    const values = [userID];
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Error retrieving user's notebook:", error);
        throw error;
    }
};

const getSavedCafe = async (userID, cafeID) => {
    const query = 'SELECT * FROM notebook WHERE user_id = $1 AND cafe_id = $2';
    const values = [userID, cafeID];
    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Return the first (and should be only) result
    } catch (error) {
        console.error("Error retrieving note from user's saved cafe:", error);
        throw error;
    }
};


const notebookService = {
    saveCafeToNotebook,
    removeSavedCafe,
    updateNotebookNote,
    getUserNotebook,
    getSavedCafe
}

module.exports = notebookService