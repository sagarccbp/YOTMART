const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Chat = require('../models/chatModel');
const User = require('../models/user');

router.post("/", async (req, res, next) => { 
    const userId = req.body.userId;
    const withUserId = req.body.withUserId;
    
    if (!userId || !withUserId) {
        return res.status(404).json({
            message : 'Invalid user id'
        })
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: userId } } },
            { users: { $elemMatch: { $eq: withUserId } } },
        ],
    }).populate('users', "-password").populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "fullName email",
    });
    
    if (isChat.length > 0) {
        return res.status(200).json(isChat[0])
    }

    const me = await User.findById(userId);
    var chatData = {
      chatName: "Full Name",
      isGroupChat: false,
      users: [userId, withUserId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
})

router.get("/", async (req, res, next) => { 
    const userId = req.query.userId;
    if (!userId) {
        return res.status(404).json({
            message : 'Invalid user id'
        })
    }
    try {
        Chat.find({ users: { $elemMatch: { $eq: userId } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "fullName email",
            });
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

// router.put("/rename", (req, res, next) => { 
    
// })

// router.put("/groupRemove", (req, res, next) => { 
    
// })

router.put("/group/createGroup", async (req, res, next) => { 
   if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
   }
    var users = req.body.users
    if (users.length < 2) {
        return res
        .status(400)
            .json({
                message: "More than 2 users are required to form a group chat"
            });
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = router;