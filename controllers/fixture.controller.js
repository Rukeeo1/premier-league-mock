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
  res.json('testing remove fixtures');
};

exports.getFixtures = async (req, res, next) => {
  try {
    const fixtures = await Fixture.find();
    res.json(
      sendResponse(httpStatus.OK, 'These are all fixtures', fixtures)
    );
  } catch (error) {
    next(error);
  }
};

exports.getPendingFixtures = async (req, res, next) => {
  try {
    const pendingFixtures = await Fixture.find({ status: "Pending" });

    res.json(sendResponse(httpStatus.OK, pendingFixtures))
  } catch (error) {
    next(error)
  }
}

exports.getCompletedFixtures = async (req, res, next) => {
  try {
    const pendingFixtures = await Fixture.find({ status: "Completed" });

    res.json(sendResponse(httpStatus.OK, pendingFixtures))
  } catch (error) {
    next(error)
  }
}

exports.search = async (req, res, next) => {
  try {
    const fixture = await Fixture.search(req.query.search)

    if (!fixture) {
      return res.json(sendResponse(httpStatus.OK, 'Fixture not found'));
    }

    res.json(sendResponse(httpStatus.OK, fixture))
  } catch (error) {
    next(error);
  }
};


exports.updateFixture = async (req, res, next) => {
  try {
    const { id } = req.params;

    let fixture = await Fixture.findById(id);
   console.log(fixture,'hello')
    if (!fixture) {
      return res.sendResponse(httpStatus[400], "Fixture doesn't exists")
    }

    fixture = await fixture.update(req.body)
console.log(fixture,'after update')
    fixture.save();

    return res.json(sendResponse(httpStatus.OK, 'Team details update successfully', fixture));

  } catch (error) {
    next(error)
  }
}

