const express = require('express');
const verifyAccessToken = require('../middlewares/auth.middleware');
const chatController = require('../controllers/chat.controller');

const router = express.Router();

router.post('/', verifyAccessToken, chatController.createChat);

module.exports = router;