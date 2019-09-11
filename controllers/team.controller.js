const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');
const TeamModel = require('../models/team.model');

exports.viewAllTeams = async (req, res, next) => {
  try {
    const teams = await TeamModel.find();
    res.json(
      sendResponse(httpStatus.OK, 'These are a list of all the teams', teams)
    );
  } catch (error) {
    next(error);
  }
};
