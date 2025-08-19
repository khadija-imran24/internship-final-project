const db = require("../db");
const bcrypt = require("bcryptjs");

// ✅ Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const query = "SELECT * FROM usertable WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];

    // Compare password (assuming you stored plain password OR hashed)
    const isMatch = await bcrypt.compare(password, user.password).catch(() => false);

    if (!isMatch && password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// ✅ Register User
const registerUser = (req, res) => {
  const { name, email, password, contact, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  // Hash password before saving
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO usertable (name, email, password, contact, role) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, email, hashedPassword, contact || "", role || "guest"], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already registered" });
      }
      return res.status(500).json({ message: "DB error", error: err });
    }

    res.json({ message: "User registered successfully", userId: result.insertId });
  });
};

module.exports = { loginUser, registerUser };
