const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');
const Fixture = require('../models/fixture.model');
const client = require('../redis/redis');

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
      sendResponse(httpStatus.OK, 'fixture successfully created', fixture)
    );
  } catch (error) {
    next(error);
  }
};

exports.getFixtures = async (req, res, next) => {
  try {
    const fixtureReadisKey = 'fixtureRedis'; //set key
    //check client for fixtures...
    return client.get(fixtureReadisKey, async (err, fixtures) => {
      if (fixtures) {
        return res.json(
          sendResponse(
            httpStatus.OK,
            'These are a list of all the fixtures',
            JSON.parse(fixtures)
          )
        );
      } else {
        const fixtures = await Fixture.find();
        client.setex(fixtureReadisKey, 360, JSON.stringify(fixtures));
        res.json(
          sendResponse(httpStatus.OK, 'These are all fixtures', fixtures)
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getPendingFixtures = async (req, res, next) => {
  try {
    //check client for pending fixtures...
    const pendingFixturesRedis = 'pendingRedisKey';
    return client.get(pendingFixturesRedis, async (err, pendingFixtures) => {
      if (pendingFixtures) {
        return res.json(
          sendResponse(httpStatus.OK, JSON.parse(pendingFixtures))
        );
      } else {
        //pedning fixtures
        const pendingFixtures = await Fixture.find({ status: 'Pending' });
        client.setex(
          pendingFixturesRedis,
          360,
          JSON.stringify(pendingFixtures)
        );
        res.json(sendResponse(httpStatus.OK, pendingFixtures));
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getCompletedFixtures = async (req, res, next) => {
  try {
    const completedFixturesKey = 'completedFixturesKey';
    return client.get(completedFixturesKey, async (err, completedFixtures) => {
      if (completedFixtures) {
        return res.json(
          sendResponse(httpStatus.OK, JSON.parse(completedFixtures))
        );
      } else {
        const completedFixtures = await Fixture.find({ status: 'Completed' });
        res.json(sendResponse(httpStatus.OK, completedFixtures));
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const fixture = await Fixture.search(req.query.search);
    if (!fixture) {
      return res.json(sendResponse(httpStatus.OK, 'Fixture not found'));
    }
    res.json(sendResponse(httpStatus.OK, fixture));
  } catch (error) {
    next(error);
  }
};

exports.updateFixture = async (req, res, next) => {
  try {
    const { id } = req.params;

    let fixture = await Fixture.findById(id);

    if (!fixture) {
      return res.sendResponse(httpStatus[400], "Fixture doesn't exists");
    }

    fixture = await fixture.update(req.body);

    fixture.save();

    return res.json(
      sendResponse(httpStatus.OK, 'Team details updated successfully', fixture)
    );
  } catch (error) {
    next(error);
  }
};

exports.getSingleFixture = async (req, res, next) => {
  try {
    const { id } = req.params;


    const singleFixRedisKey = 'keyForSingleFix';
    return client.get(singleFixRedisKey, async (err, fixture) => {
      if (fixture) {
        return res.json(sendResponse(httpStatus.OK, JSON.parse(fixture)));
      } else {
        const fixture = await Fixture.get(id);

        if (fixture) {
          client.setex(singleFixRedisKey, 360, JSON.stringify(fixture));
          return res.json(sendResponse(httpStatus.OK, fixture));
        } else {
          res.json(sendResponse(httpStatus.BAD_REQUEST, 'Fixture Not Found'));
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.removeFixture = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, 'hello rukee');

    const fixture = await Fixture.findByIdAndRemove(id);

    return res.json(
      sendResponse(httpStatus.OK, 'Successfully deleted', fixture)
    );
  } catch (error) {
    next(error);
  }
};