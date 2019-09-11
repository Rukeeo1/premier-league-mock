const jwt = require('jwt-simple');
const moment = require('moment-timezone');

const EncodeToken = (email, id, isAdmin) => {
  const payload = {
    exp: moment()
      .add(process.env.JWT_EXPIRATION_INTERVAL, 'days')
      .unix(),
    iat: moment().unix(),
    sub: id,
    email,
    isAdmin
  };
  return jwt.encode(payload,  process.env.JWT_SECRET);
};

module.exports = EncodeToken;
