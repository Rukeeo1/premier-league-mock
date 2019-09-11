const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')





//check the api...
router.get('/health-check', (req, res) => res.send('OK'));


//mount user route.../api/v1/user
router.use('/user', userRoutes)

//authentification route for login related issues.... /api/v1/auth/login
router.use('/auth', authRoutes)

module.exports = router;