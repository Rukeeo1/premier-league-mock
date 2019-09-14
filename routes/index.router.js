const express = require('express');
const router = express.Router();
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const adminRoutes = require('./admin.route')
const teamRoutes = require('./team.route')
const fixturesRoutes = require('./fixture.route')






//check the api...
router.get('/health-check', (req, res) => res.send('OK'));


//mount user route.../api/v1/user
router.use('/user', userRoutes)

//admin routes.../api/v1/admin
router.use('/admin', adminRoutes)

//authentification route for login related issues.... /api/v1/auth/login
router.use('/auth', authRoutes)


//mount teams routes... /api/v1/teams
router.use('/teams', teamRoutes)

//mout fixture routes  /api/v1/fixtures
router.use('/fixtures', fixturesRoutes)

module.exports = router;