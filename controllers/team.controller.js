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

exports.getTeam = async (req, res, next) => {
  try {
    const team = await TeamModel.findById(req.params.id);
    
    if(!team) {
      return res.json(sendResponse(httpStatus.BAD_REQUEST,'The team not found' ))
    }

  return   res.json(sendResponse(httpStatus.OK,team))
  
  } catch (error) {
   next(error) 
  }
}
