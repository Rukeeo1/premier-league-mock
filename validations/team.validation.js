const { Joi } = require('celebrate');

module.exports = {
  //add Team
  addTeam: {
    body: {
      name: Joi.string()
        .min(3)
        .required(),
      code: Joi.string(),
      founded: Joi.string().min(4),
      address: Joi.string().required(),
      city: Joi.string().required(),
      stadiumCapacity: Joi.string()
    }
  },
  //update Team details
  updateTeam: {
    body: {
      name: Joi.string().min(3),
      code: Joi.string(),
      founded: Joi.string().min(4),
      address: Joi.string(),
      city: Joi.string(),
      stadiumCapacity: Joi.string()
    }
  }
};
