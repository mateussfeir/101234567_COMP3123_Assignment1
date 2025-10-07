const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

// Employee management routes
router.get('/employees', getAllEmployees);
router.post('/employees', createEmployee);
router.get('/employees/:eid', getEmployeeById);
router.put('/employees/:eid', updateEmployee);
router.delete('/employees', deleteEmployee);

module.exports = router;
