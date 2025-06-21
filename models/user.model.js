const db = require("../config/db");

// Create new user
exports.createUser = (name, email, hashedPassword, callback) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], callback);
};


// exports.findUserByEmail = (email, callback) => {
//   const query = "SELECT * FROM users WHERE email = ?";
//   db.query(query, [email], callback);
// };
