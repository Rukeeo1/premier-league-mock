const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const fixtureValidation = require('../validations/fixture.validation');
const fixtureCtrl = require('../controllers/fixture.controller')

const router = express.Router();


router.route('/').get(fixtureCtrl.getFixtures)

/** /api/v1/fixtures/pending */
router.route('/pending').get(fixtureCtrl.getPendingFixtures)

module.exports = router