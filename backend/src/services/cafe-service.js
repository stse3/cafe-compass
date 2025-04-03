const {pool} = require('../config/db.config.js');
console.log('DB USER:', process.env.DB_USER);
async function testConnection() {
    try {
      // Get a client from the pool
      const client = await pool.connect();
      
      // Run a test query
      const result = await client.query('SELECT NOW()');
      console.log('Database connection successful at:', result.rows[0].now);
      
      // Release the client back to the pool
      client.release();
    } catch (err) {
      console.error('Error testing database connection:', err);
    } finally {
      // Close the pool when done
      await pool.end();
    }
  }
  
  // Run the test
  testConnection();