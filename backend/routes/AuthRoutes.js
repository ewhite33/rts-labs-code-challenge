// Routes for auth endpoints signup and signin
const express = require('express');
const { signup, signin } = require('../controllers/AuthController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;