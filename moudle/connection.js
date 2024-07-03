const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cooknet',
  connectionLimit: 10 // Adjust the limit as needed
});

module.exports = pool;
