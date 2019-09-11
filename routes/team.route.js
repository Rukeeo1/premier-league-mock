const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const teamCtrl = require('../controllers/team.controller');
const verifyToken = require('../helpers/verifyToken')


const router = express.Router();

router.get('/',teamCtrl.viewAllTeams);

module.exports = router