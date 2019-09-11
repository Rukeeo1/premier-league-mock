const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route')




//check the api...
router.get('/health-check', (req, res) => res.send('OK'));


//mount user route...api/v1/user
router.use('/user', userRoutes)

module.exports = router;