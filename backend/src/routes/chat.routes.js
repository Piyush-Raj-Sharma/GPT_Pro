const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

post('/', verifyToken);

module.exports = router;