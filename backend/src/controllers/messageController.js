// filepath: backend/src/controllers/messageController.js
const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ message: "Invalid data passed into request" });
  }

  var message = await Message.create({
    sender: req.user._id,
    content: content,
    chat: chatId,
  });

  message = await message.populate("sender", "name email");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name email",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  res.json(message);
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };