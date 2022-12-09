const { json } = require("express");
const asyncHandler = require("express-async-handler")
const Chat = require('../models/chatModel');
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const fetchChats = asyncHandler(async (req,res) => {
  
    try {
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate('users','-password')
        .populate('groupAdmin','-password')
        .populate('latestMessage')
        .sort({updatedAt:-1})
        .then(async (results) => {
          results = await User.populate(results,{
            path:"latestMessage.sender",
            select:"name pic email"
          })

        res.status(200).send(results)
        })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

const createGroupChat = asyncHandler(async (req,res) => {

    if(!req.body.users||!req.body.name){
        return res.status(400).send({message:'please fill all the feilds'})
    }
    

    let users = JSON.parse(req.body.users)
  
    //users array containing all the users which are being added in group chat which is sent via frontend form
    if(users.length<2){
        return res.send(400).send("more then two users are required to create group chat")
    }

    //pushing the current user into the users array
    users.push(req.user)
     
    try {
        
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user
        })

        const fullGroupChat = await Chat.findOne({
            _id:groupChat._id
        })
        .populate("users","-password")
        .populate("groupAdmin","-password")

        res.status(200).json(fullGroupChat)

    } catch (err) {

        console.log(err)
        res.send(err)

    }

})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin
    //req.user._id

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin
    //req.user._id

    //check if the req.user is the group admin
    // const chat = await Chat.findById(chatId);

    // if (chat.groupAdmin.toString() !== req.user._id.toString()) {
    //     res.status(401);
    //     throw new Error("You are not the admin of this group");
    // }

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        }
        ,
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    
    if (!removed) {
        
        res.status(404)
        throw new Error("Chat Not Found")

    } else {

        res.json(removed)

    }

})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup,addToGroup, removeFromGroup }