const express = require('express');
const router = express.Router();
const roomHistoryController = require('../controllers/roomHistoryController');

router.get('/', roomHistoryController.getAllRoomHistory);
router.get('/:id', roomHistoryController.getRoomHistoryById);

module.exports = router;
