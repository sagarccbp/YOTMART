
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/message');
const User = require("../models/user");
const Chat = require('../models/chatModel');


router.post("/", async (req, res, next) => { 
    const { content, chatId } = req.body;
    const userId = req.body.sender;
    const file = req.file;
    if (file) {
        // Store this file in server.. 
        
    }
    if (!content || !chatId) {
        return res.status(404).json({
            message : "Invalid content or chat "
        })
    }
    var newMessage = {
        sender: userId,
        content: content,
        chat: chatId,
    };
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "fullName")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "fullName email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    return res.json(message);
})

router.get("/:chatId", async (req, res, next) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "fullName email")
            .populate("chat");
        return res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

router.put("/updateSeen", async (req, res, next) => {
    const { chatId, sender } = req.body;
   
    const messages = await Message.find({ chat: chatId })
    
    if (messages && messages.length > 0) {
        const latestMessage = messages[0];
        console.log(latestMessage.sender.toString() !== sender)
        if (latestMessage.sender.toString() !== sender) {
            const message = await Message.updateOne({ _id: latestMessage._id }, { isSeen: true })
            const messages = await Message.find({ chat: chatId })
                .populate("sender", "fullName email")
                .populate("chat");
        return res.json(messages);
        } else {
            console.log("Seen not updating.. ");
            return res.json({
                message : "You are not visitor"
            });
        }
    } else {
        return res.json([])
    }
    
})

module.exports = router;