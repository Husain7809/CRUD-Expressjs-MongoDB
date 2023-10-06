const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');

const userController = require('../controllers/user.controller');


router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/me', auth, userController.me);


module.exports = router;