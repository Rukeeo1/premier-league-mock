const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const adminCtrl = require('../controllers/admin.controller');
const userValidation = require('../validations/user.validation');



const router = express.Router();

router.route('/').post(validate(userValidation.signUp, { abortEarly: false }), adminCtrl.createAdmin)

module.exports =  router;