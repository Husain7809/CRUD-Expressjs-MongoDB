const express = require('express');
const router = express.Router();

// file upload helper
const upload = require('../helpers/file-upload.helper').upload;

// AUTH middleware
const auth = require('../middleware/auth.middleware');

// controller
const userController = require('../controllers/user.controller');


// routes
router.post('/register', upload.single('profile'), userController.createUser);
router.post('/login', userController.login);
router.get('/me', auth, userController.me);


module.exports = router;