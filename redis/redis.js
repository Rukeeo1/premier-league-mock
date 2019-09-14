const redis = require('redis'); //required redis

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
}); //created redis client
// echo redis errors to the console
client.on('error', err => {
  //logged redis error to the console...
  console.log('Error ' + err);
});

module.exports = client;
//6397 LOCAL HOST
