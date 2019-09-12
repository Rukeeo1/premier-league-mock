const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const adminCtrl = require('../controllers/admin.controller');
const teamCtrl = require('../controllers/team.controller');
const userValidation = require('../validations/user.validation');
const teamValidation = require('../validations/team.validation');
const fixtureValidation = require('../validations/fixture.validation');
const fixtureCtrl = require('../controllers/fixture.controller')
const verifyToken = require('../helpers/verifyToken')
const  verifyAdmin = require('../middlewares/verifyAdmin.middleware')



const router = express.Router();

router.route('/').post(validate(userValidation.signUp, { abortEarly: false }), adminCtrl.createAdmin)

router.use(verifyToken)

router.use(verifyAdmin)
//create team route...

/** api/v1/admin/add-team */
router.route('/add-team').post(validate(teamValidation.addTeam, { abortEarly: false }), adminCtrl.addTeam)


/** api/v1/admin/edit-team/:id */
router.route('/edit-team/:id').put(validate(teamValidation.updateTeam, { abortEarly: false }), adminCtrl.updateTeam)

/** api/v1/admin/remove-team/:id */
router.route('/remove-team/:id').delete(teamCtrl.removeTeam)

/** /api/v1/admin/edit-fixture/:id */
router.route('/edit-fixture/:id').put(fixtureCtrl.updateFixture)

/** /api/v1/admin/fixtures */
router.route('/fixtures').post(validate(fixtureValidation.createFixture, { abortEarly: false }), fixtureCtrl.addFixture)

 /** /api/v1/admin/remove-fixture/ */
 router.route('/remove-fixture/:id').delete(fixtureCtrl.removeFixture)
 
  

module.exports =  router;