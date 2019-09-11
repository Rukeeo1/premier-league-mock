const httpStatus = require('http-status');
const User = require('../models/user.model');
const sendResponse = require('../helpers/response');

exports.signUp = async (req, res, next) => {
  try {
    const { email } = req.body

    let userExist = await User.findOne({ email })

    if (userExist) {
      return res.json(sendResponse(httpStatus.BAD_REQUEST, 'Bad Request', { msg: 'Email already in use' }))
    }

    const user = new User(req.body)
    await user.save()
    return res.json(sendResponse(httpStatus.OK, "signup sucessful",  user))

  } catch (error) {
    next(error)
  }
}

