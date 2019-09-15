const redis = require('redis'); //required redis
require("dotenv").config();
const client = redis.createClient(
 process.env.REDIS_URL
); //created redis client
// echo redis errors to the console
client.on('error', err => {
  //logged redis error to the console...
  console.log('Error ' + err);
});

module.exports = client;
//6397 LOCAL HOST
