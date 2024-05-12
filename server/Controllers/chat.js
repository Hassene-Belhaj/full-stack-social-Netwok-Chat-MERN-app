const { Asyncwrapper } = require("../Middlewares/AsyncWrapper");
const { createCustomError } = require("../Middlewares/ErrorHandler");
const conversationModel = require("../Models/conversationModel");
const messagesModel = require("../Models/messagesModel");

const sendMessage = Asyncwrapper(async (req, res, next) => {
  const senderId = req.user.id;
  const { recipientID, message } = req.body;
  let conversationBetween = await conversationModel.findOne({
    participants: { $all: [senderId, recipientID] }, // $all opearator must have 2 users
  });
  if (!conversationBetween) {
    conversationBetween = new conversationModel({
      participants: [senderId, recipientID],
      lastMessage: {
        text: message,
        sender: senderId,
      },
    });
    await conversationBetween.save();
  }
  const newMessage = new messagesModel({
    conversationID: conversationBetween._id,
    text: message,
    sender: senderId,
  });
  await newMessage.save();
  
  await conversationBetween.updateOne({ //update lastMessage
    lastMessage: {
      text: message,
      sender: senderId,
    },
  });
  const newMsg = await messagesModel.findOne({_id : newMessage._id}).populate('sender', ["username" , "email" , "profilePic"])
  res.status(201).json({ success: true, newMsg });
});

const getMessage = Asyncwrapper(async(req,res,next) => {
    const {otheruserid} = req.params ;
    const userID = req.user.id
    const conversation = await conversationModel.findOne({
        participants : {$all : [userID , otheruserid]}
    })
    if(!conversation) return next(createCustomError('no conversation with this user' ,404))
      
       const allMessages = await messagesModel.find({conversationID : conversation._id}).sort({createdAt : 1}).populate('sender' , ["username","email","profilePic"])
    res.status(200).json({success :true , conversationId : conversation._id , allMessages })   
  })
  

  const getConversation = Asyncwrapper(async(req,res,next)=>{
    const userID = req.user.id ;
    const conversations = await conversationModel.find({
      participants : {$in : [userID]}
    }).populate("participants lastMessage.sender", ["username","email","profilePic"]).select("-updatedAt -__v")
    if(!conversations) return next(createCustomError('no conversation with this user' ,404))

    conversations.forEach(conversation => {
      conversation.participants =  conversation.participants.filter((participant)=>String(participant._id) !== userID)
    });

    
    res.status(200).json({success : true , conversations})
})



module.exports = {
  sendMessage , getMessage , getConversation
};
