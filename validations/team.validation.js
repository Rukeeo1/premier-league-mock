const { Joi } = require('celebrate')

module.exports = {
  //add Team
  addTeam: {
    body: {
      name: Joi.string().min(3).required(),
      code: Joi.string(),
      founded: Joi.string().min(4),
      address: Joi.string().required(),
      city: Joi.string().required(),
      stadiumCapacity: Joi.string()
    }
  }
}