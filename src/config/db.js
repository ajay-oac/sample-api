const mysql2 = require("mysql2");

/**
 * Create a pool of DB connections for connecting to the DB.
 */
const pool = mysql2
  .createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .promise();

module.exports = pool;
