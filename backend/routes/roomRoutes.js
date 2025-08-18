const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const auth = require('../middleware/auth');       // must be a function
const adminOnly = require('../middleware/admin'); // must be a function

// Public routes
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);

// Admin-only routes
router.post('/', auth, adminOnly, roomController.createRoom);
router.put('/:id', auth, adminOnly, roomController.updateRoom);
router.delete('/:id', auth, adminOnly, roomController.deleteRoom);

module.exports = router;






// const express = require('express');
// const router = express.Router();
// const roomController = require('../controllers/roomController');

// router.get('/rooms', roomController.getAllrooms);

// module.exports = router;
