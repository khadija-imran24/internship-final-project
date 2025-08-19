const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// GET /rooms
router.get("/", roomController.getRooms);

module.exports = router;
