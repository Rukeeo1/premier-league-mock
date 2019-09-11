const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');
const TeamModel = require('../models/team.model');


exports.viewAllTeams = async(req,res,next) => {
  
  try {
res.send('view all teams testing')
    
  } catch (error) {
    next(error)
  }
}