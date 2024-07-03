const pool = require('./connection'); // Import the connection pool

function getPageContent(pageName, callback) {
  const query = 'SELECT content FROM pages WHERE name = ?';
  pool.query(query, [pageName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      callback(err, null);
      return;
    }
    if (results.length > 0) {
      callback(null, results[0].content);
    } else {
      callback(null, null);
    }
  });
}

module.exports = {
  getPageContent
};
