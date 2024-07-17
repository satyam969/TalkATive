const express = require('express');
const userDetails = require('../middleware/auth-middleware');
const { sendMessage, allMessages } = require('../controller/message-controller');

const router= express.Router();

router.route('/').post(userDetails,sendMessage);
router.route('/:chatId').get(userDetails,allMessages);


module.exports = router;