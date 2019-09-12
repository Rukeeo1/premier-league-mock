const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');
const Fixture = require('../models/fixture.model');

exports.addFixture = async (req, res, next) => {
  try {
    const { homeTeam, awayTeam, venue } = req.body;


    //if hometeam, awayteam, and venue already exist...break..
    const fixtureExist = await Fixture.find({ homeTeam, awayTeam, venue });

    if (fixtureExist.length) {
      return res.json(
        sendResponse(httpStatus.BAD_REQUEST, 'this fixture already exists')
      );
    }

    const fixture = new Fixture(req.body);

    await fixture.save();

    return res.json(
      sendResponse(httpStatus.OK, 'fixture successfully create', fixture)
    );
  } catch (error) {
    next(error);
  }
};

exports.removeFixture = async (req, res, next) => {
res.json('testing remove fixtures')
}


exports.getFixtures = async (req, res, next) => {
 res.json('testing get fixtures ')
}

