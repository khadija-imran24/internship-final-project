const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // your db.js in backend/

const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
