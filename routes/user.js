const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// Routes for user signup and login
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
