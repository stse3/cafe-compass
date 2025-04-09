const {Pool} = require ('pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
console.log('DB USER:', process.env.DB_USER);

//create a connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });


module.exports = pool;