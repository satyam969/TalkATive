const Chat = require("../model/ChatModel");
const { Message } = require("../model/MessageModel");
const User = require("../model/UserModel");

// sending new message 
const sendMessage = async(req,res)=>{
// 3 things req chatid,message,sender

const {content,chatId}=req.body;

if(!content || !chatId) {
    console.log("Invalid Data Passed to Server");
    return res.status(400).send({
        message:"Invalid Data"
    })
}

var newMessage={
    sender:req.user._id,
    content:content,
    chat:chatId
}

try {

var message =await Message.create(newMessage);
//   populate sender,user,.. 


message=await message.populate("sender","name profile_picture");

message=await message.populate("chat");

message=await User.populate(message,{
    path:"chat.users",
    select:"name profile_picture email"
});

// filling latest message
await Chat.findByIdAndUpdate(chatId,{ latestMessage:message})


res.status(201).json(message);
    
} catch (error) {
    
console.log(error);
res.status(400).send(error);

}


}


// fetching all messages for a particular chat 

const allMessages=async(req,res)=>{
    try {

        const {chatId}=req.params;

        const messages=await Message.find({chat:chatId}).populate("sender","name profile_picture").populate('chat');

        res.status(200).json(messages);
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


module.exports={sendMessage,allMessages}