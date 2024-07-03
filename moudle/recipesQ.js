const pool = require('./connection'); // Import the connection pool

function saveRecipe(recipe, callback) {
  let query, params;
  if (recipe.image) {
    query = 'INSERT INTO myrecipes (name, description, image) VALUES (?, ?, ?)';
    params = [recipe.name, recipe.description, recipe.image];
  } else {
    query = 'INSERT INTO myrecipes (name, description) VALUES (?, ?)';
    params = [recipe.name, recipe.description];
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      callback(err, null);
      return;
    }
    callback(null, results.insertId);
  });
}

function getUserRecipes(callback) {
  const query = 'SELECT id, name, description, image FROM myrecipes';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  saveRecipe,
  getUserRecipes
};
