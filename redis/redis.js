const redis = require('redis'); //required redis

const client = redis.createClient({
  host: process.env.REDIS_CLIENT_HOST,
  port: 13384,
  no_ready_check: true,
  auth_pass: process.env.REDIS_LAB_AUTH_PASS
}); //created redis client

// echo redis errors to the console
client.on('error', err => {
  //logged redis error to the console...
  console.log('Error ' + err);
});

module.exports = client;
//6397 LOCAL HOST
