const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');
const TeamModel = require('../models/team.model');
const client = require('../redis/redis');
const teams = require('../seeder/team.seed')

exports.viewAllTeams = async (req, res, next) => {
  try {
    const redisTeamsKeys = 'teamRedis'; //redis key..
    return client.get(redisTeamsKeys, async (err, teams) => {
      //if teams exists in redis cache...return teams
      if (teams) {
        return res.json(
          sendResponse(
            httpStatus.OK,
            'These are a list of all the teams',
            JSON.parse(teams)
          )
        );
      } else {
        //else find teams from the database and first set redis key...
        const teams = await TeamModel.find();
        //return normal response to client...
        res.json(
          sendResponse(
            httpStatus.OK,
            'These are a list of all the teams',
            teams
          )
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getTeam = async (req, res, next) => {
  try {
    //create key for redis...
    const redisTeamKey = 'redisTeam';
    return client.get(redisTeamKey, async (err, team) => {
      //if team exists on the client...return
      if (team) {
        return res.json(
          sendResponse(
            httpStatus.OK,
            'Team request successful',
            JSON.parse(team)
          )
        );
      } else {
        const team = await TeamModel.findById(req.params.id);

        client.setex(redisTeamKey, 360, JSON.stringify(team));

        return res.json(
          sendResponse(httpStatus.OK, 'Team request successful', team)
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const searchedTeamKeyRedis = 'searchedTeam';
        const team = await TeamModel.search(req.query.search);
        //if team doesn't exist...  return not found
        if (!team) {
          return res.json(
            sendResponse(httpStatus.BAD_REQUEST, 'Team not found')
          );
        }
        res.json(sendResponse(httpStatus.OK, 'Team search sucessful', team));
   
  } catch (error) {
    next(error);
  }
};

exports.removeTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    let team = await TeamModel.findByIdAndRemove(id);
    res.json(sendResponse(httpStatus.OK, 'Team sucessfully removed', team));
  } catch (error) {
    next(error);
  }
};

/**
 * this controller ... is responsible for seeding teams...
 * 
 exports.seedTeams =async (req,res,next) => {
  try {
   const checkTeams = await TeamModel.find();
   console.log(checkTeams,'hello')
   if(checkTeams.length){ return res.json(checkTeams)}
     for(var i = 0; i < teams.length; i++){
       let newTeam = new TeamModel(teams[i]);
       await newTeam.save();
     }
   
   res.json('seeding completed')
  } catch (error) {
    
  }
}
 */
