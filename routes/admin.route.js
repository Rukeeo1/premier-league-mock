const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const adminCtrl = require('../controllers/admin.controller');
const userValidation = require('../validations/user.validation');
const teamValidation = require('../validations/team.validation');
const verifyToken = require('../helpers/verifyToken')
const  verifyAdmin = require('../middlewares/verifyAdmin.middleware')





const router = express.Router();

router.route('/').post(validate(userValidation.signUp, { abortEarly: false }), adminCtrl.createAdmin)

router.use(verifyToken)

router.use(verifyAdmin)
//create team route...
/** api/v1/admin/add-team */
router.route('/add-team').post(validate(teamValidation.addTeam, { abortEarly: false }), adminCtrl.addTeam)


module.exports =  router;