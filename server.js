const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');//required redis
const client = redis.createClient();//create client
const session = require('express-session');//session
const redisStore = require('connect-redis')(session);//global redis store...


const dotenv = require('dotenv');
dotenv.config();

const app = express();

client.on('error', (err) => {//logged redis error to the console...
  console.log("Error " + err)
});

const morgan = require('morgan');
const routes = require('./routes/index.router')
const { customErrorMessage } = require('./helpers/errorHandlerJoi');

//check node environment and choose connection...
let db_url =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_HOST_TEST
    : process.env.MONGO_HOST;

mongoose
  .connect(db_url,  {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to sterling-test-backend');
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.use(session({
  secret: 'ThisIsHowYouUseRedisSessionStorage',
  name: 'sterling-premier-league',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 86400 })
}))

//index routes...
app.use('/api/v1', routes);

app.use((err, req, res, next) => {
  let message = err;
 
  if (err.joi) {
    message = customErrorMessage(err.joi.details);
  }
  next(message);
}); //error converter

//error handler
app.use((err, req, res, next) => {
  res.send(err);
});

//for urls that aren't found...
app.use((req, res) => {
  res.send('Not found');
});

let port = process.env.PORT ||6060;
// console.log(client,'this is cl')


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log('Server running on Port ' + 6060);
  });
}


module.exports = {
  app: app
  // client: client
}