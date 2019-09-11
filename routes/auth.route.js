const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const authValidation = require('../validations/auth.validation');
const userCtrl = require('../controllers/user.controller');


const router = express.Router()

router.post('/login', validate(authValidation.login, { abortEarly: false }), userCtrl.login)

module.exports = router;