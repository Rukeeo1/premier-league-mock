const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');

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
  res.json('hello testing admin login')
};