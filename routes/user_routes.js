const express = require('express');
const router = express.Router();
const UserController = require('../controllers/book_controller');

// POST /users/login
router.post('/Auth/login', UserController.login);

module.exports = router;
