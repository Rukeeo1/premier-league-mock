const jwt = require('jwt-simple');
const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');

function verifyToken(req, res, next) {
  const authorization = req.header('Authorization');
  if (!authorization)
    return res.json(
      sendResponse(httpStatus.UNAUTHORIZED, 'You are not authorized')
    );

  try {
    let token = authorization.split(' ')[1];

    let verify = jwt.decode(token, process.env.JWT_SECRET);
    req.user = verify;
 
    return next();
  } catch (error) {
    res.json(sendResponse('invalid token'));
  }
}

module.exports = verifyToken;
