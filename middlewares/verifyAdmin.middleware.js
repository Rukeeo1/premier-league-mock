const httpStatus = require('http-status');
const sendResponse = require('../helpers/response')

function verifyAdmin(req,res,next) {
  try {
  if(!req.user.isAdmin){
    return res.json(sendResponse(httpStatus.UNAUTHORIZED, 'Admin Only'))
  }
    next();
  } catch (error) {
    
  }

}

module.exports = verifyAdmin;