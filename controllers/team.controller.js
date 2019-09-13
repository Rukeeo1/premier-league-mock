const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');
const TeamModel = require('../models/team.model');
const client  = require('../redis/redis')



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

exports.search = async (req,res,next) => {
  try {

    const team = await TeamModel.search(req.query.search);

    if(!team){
      return res.json(sendResponse(httpStatus.BAD_REQUEST, 'Team not found'))
    }

    res.json(sendResponse(httpStatus.OK,'This is the Team',team))
  } catch (error) {
    next(error)
  }
}

exports.removeTeam = async (req, res, next) => {
  
    try {
      const { id } = req.params;
      let team = await TeamModel.findByIdAndRemove(id);
      res.json(sendResponse(httpStatus.OK, 'Team sucessfully removed', team))
    } catch (error) {
      next(error)
    
  }
}