const express = require('express');
const userDetails = require('../middleware/auth-middleware');
const {accessChat,fetchchats, createGroupChat, renameGroup, removeFromGroup, addToGroup} = require('../controller/chat-controller');

const router=express.Router();

// individual chats
router.route('/').post(userDetails,accessChat).get(userDetails,fetchchats);

// groups
router.route('/group').post(userDetails,createGroupChat);
router.route('/renames').put(userDetails,renameGroup);
router.route('/groupremove').put(userDetails,removeFromGroup);
router.route('/groupadd').put(userDetails,addToGroup);


module.exports = router;