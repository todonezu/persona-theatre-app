// Database connection file
// Creates a connection pool to MariaDB using credentials from .env

const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const db = pool.promise();

// Export the database connection

module.exports = db;