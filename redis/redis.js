const redis = require('redis');//required redis


const client = redis.createClient(6379,'localhost');//created redis client
// echo redis errors to the console
client.on('error', (err) => {//logged redis error to the console...
  console.log("Error " + err)
});

module.exports = client;