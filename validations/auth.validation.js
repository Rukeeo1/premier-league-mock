const {Joi} = require('celebrate')

module.exports = {
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(20)
        .required()
    }
  }
}

