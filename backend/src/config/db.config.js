const {Pool} = require ('pg');

//create a connection pool
const pool = new Pool ({
    connectionString:process.env.DATABASE_URL,
});

//test the connnection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Connected to PostgreSQL at', res.rows[0].now);
    }
  });
  

module.exports = pool;