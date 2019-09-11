const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const teamCtrl = require('../controllers/team.controller');
const verifyToken = require('../helpers/verifyToken')


const router = express.Router();

router.get('/search', teamCtrl.search)

router.use(verifyToken) 

router.get('/',teamCtrl.viewAllTeams);


router.get('/:id', teamCtrl.getTeam);



module.exports = router