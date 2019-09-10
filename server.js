const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan');


mongoose
  .connect('mongodb://localhost/sterling-test-backend', {
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


const port = process.env.PORT ||6060;


app.listen(port, () => {
  console.log('Server running on Port ' + port);
});