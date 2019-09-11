const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const userCtrl = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation')

const router = express.Router();


router.route('/').post(validate(userValidation.signUp, { abortEarly: false }),userCtrl.signUp)


module.exports = router;