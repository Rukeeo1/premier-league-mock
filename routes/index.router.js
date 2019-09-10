const express = require('express');
const router = express.Router();



//check the api...
router.get('/health-check', (req, res) => res.send('OK'));