const { Joi } = require('celebrate');

module.exports = {
  //add Fixture
  createFixture: {
    body: {
      date: Joi.string().required(),
      time: Joi.string().required(),
      status: Joi.string(),
      refree: Joi.string(),
      venue: Joi.string().required(),
      homeTeam: Joi.string().required(),
      awayTeam: Joi.string().required(),
      homeTeamName:Joi.string().required(),
      awayTeamName: Joi.string().required(),
      goalsHomeTeam: Joi.string(),
      goalsAwayTeam: Joi.string(),
      fullTimeScores: Joi.string(),
      result: Joi.string()
    }
  }
};
