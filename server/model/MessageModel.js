const mongoose=require('mongoose');



const messageSchema=new mongoose.Schema({

    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],


},{timestamps:true})




const conversationschema=new mongoose.Schema({

    sender:{type:mongoose.Schema.ObjectId,required:true,
        ref:'User'
    },
    reciever:{type:mongoose.Schema.ObjectId,required:true, ref:'User'},
    messages:[{type:mongoose.Schema.ObjectId,
        ref:'Message'
    }],




},{timestamps:true})

const Message=new mongoose.model('Message',messageSchema)

const Conversation=new mongoose.model('Conversation',conversationschema);

module.exports={Message,Conversation};