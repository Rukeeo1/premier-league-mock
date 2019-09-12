const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const fixtureValidation = require('../validations/fixture.validation');
const fixtureCtrl = require('../controllers/fixture.controller')

const router = express.Router();


router.route('/').get(fixtureCtrl.getFixtures)

/** /api/v1/fixtures/pending */
router.route('/pending').get(fixtureCtrl.getPendingFixtures)

/** api/v1/fixtures/completed*/
router.route('/completed').get(fixtureCtrl.getCompletedFixtures)

router.route('/search').post(fixtureCtrl.search)

module.exports = router