const { Joi } = require('celebrate');

module.exports = {
  //sign up...
  signUp: {
    body: {
      name: Joi.string().min(3).max(120),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(15),
      isAdmin: Joi.boolean(),
      favoriteTeam: Joi.string(),
      location: Joi.string()
    }
  }
}

