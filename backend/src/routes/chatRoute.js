const express = require('express');
const router = express.Router();
const { accessChat, fetchChats } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const { createGroupChat } = require('../controllers/chatController');
const { renameGroup } = require('../controllers/chatController');
const { removeFromGroup } = require('../controllers/chatController');
const { addToGroup } = require('../controllers/chatController');
const { sendMessage, allMessages } = require('../controllers/messageController');

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)

router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroup)
router.route('/groupRemove').put(protect, removeFromGroup)
router.route('/groupAdd').put(protect, addToGroup)

router.route('/message/:chatId').get(protect, allMessages)
router.route('/message').post(protect, sendMessage)

module.exports = router;