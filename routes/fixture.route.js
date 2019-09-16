const express = require('express');
const { celebrate: validate, errors } = require('celebrate');
const fixtureValidation = require('../validations/fixture.validation');
const fixtureCtrl = require('../controllers/fixture.controller')
const verifyToken = require('../helpers/verifyToken')

const router = express.Router();

router.route('/search').get(fixtureCtrl.search)

router.use(verifyToken)

router.route('/').get(fixtureCtrl.getFixtures)

/** /api/v1/fixtures/pending */
router.route('/pending').get(fixtureCtrl.getPendingFixtures)

/** api/v1/fixtures/completed*/
router.route('/completed').get(fixtureCtrl.getCompletedFixtures)

router.route('/:id').get(fixtureCtrl.getSingleFixture)

router.route('/unique/:id').get(fixtureCtrl.getFixtureByLink)
router.route('/remove-fixture/:id').delete(fixtureCtrl.removeFixture)


module.exports = router