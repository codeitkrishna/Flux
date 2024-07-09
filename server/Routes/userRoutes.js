const express = require('express');
const {register, login} = require('../controllers/authenticationController');
const userRoutes = express.Router();

userRoutes.post('/register', register);

userRoutes.post('/login', (req, res, next) => {
    console.log('Login route hit');
    next();
}, login);

module.exports = userRoutes;