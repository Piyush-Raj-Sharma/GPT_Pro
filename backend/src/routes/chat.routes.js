const express = require('express');
const verifyAccessToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', verifyAccessToken);

module.exports = router;