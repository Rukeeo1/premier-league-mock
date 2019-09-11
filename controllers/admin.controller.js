const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');

exports.createAdmin = async (req, res, next) => {
res.json('testing create admin route')
};