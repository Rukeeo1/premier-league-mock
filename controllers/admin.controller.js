const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');
const TeamModel = require('../models/team.model');

exports.createAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      userExists.isAdmin = true;

      await userExists.save();
      return res.json(sendResponse(httpStatus.OK, 'Admin created', userExists));
    }

    const admin = new User(req.body);
    admin.isAdmin = true
   
    await admin.save();

    res.json(sendResponse(httpStatus.OK, 'Admin created', admin));
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email });

    if (!admin) {
      return res.json(
        sendResponse(httpStatus['400_MESSAGE'], 'Email or Password is Wrong')
      );
    }


    if (!(await admin.checkPasswordMatch(password))) {
      return res.json(
        sendResponse(httpStatus['400_MESSAGE'], 'Email or Password is Wrong')
      );
    }

    const adminAfterLogin = await admin.transform();

    return res.json(
      sendResponse(httpStatus[200], adminAfterLogin, admin.token())
    );
  } catch (error) {
    next(error);
  }
};

exports.addTeam = async (req, res, next) => {
  try {
    const { name } = req.body;
    const teamExists = await TeamModel.findOne({ name });
    if (teamExists) {
      res.json(sendResponse(httpStatus[200], 'Team Already Exits'));
    }

    const team = new TeamModel(req.body);
    await team.save();

    return res.json(sendResponse(httpStatus.OK, 'team created', team));
  } catch (error) {
    next(error);
  }
  
};

