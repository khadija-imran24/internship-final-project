const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

// Public (view employees)
router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);

// Admin-only (manage employees)
router.post('/', auth, adminOnly, employeesController.createEmployee);
router.put('/:id', auth, adminOnly, employeesController.updateEmployee);
router.delete('/:id', auth, adminOnly, employeesController.deleteEmployee);

module.exports = router;
