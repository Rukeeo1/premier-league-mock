const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
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

//index routes...
app.use('/api/v1', routes);

let port = process.env.PORT ||6060;



if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log('Server running on Port ' + 6060);
  });
}


module.exports = app