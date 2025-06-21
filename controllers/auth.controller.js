const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

//   const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
//   db.query(query, [name, email, hashedPassword], (err, result) => {
//     if (err) {
//       if (err.code === "ER_DUP_ENTRY") {
//         return res.status(400).json({ error: "Email already registered" });
//       }
//       return res.status(500).json({ error: err.message });
//     }

//     res.status(201).json({ message: "User registered successfully" });
//   });
// };

 UserModel.createUser(name, email, hashedPassword, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already registered" });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
};
exports.login = (req, res) => {
  const { email, password } = req.body;

//   db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
//     if (err || results.length === 0) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

 UserModel.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
};
