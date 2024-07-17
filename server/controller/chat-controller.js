const mongoose = require('mongoose');
const Chat = require('../model/ChatModel');

const User = require('../model/UserModel')
// one on one chat
const accessChat = async (req, res) => {

    try {

        const { userId } = req.body;
        if (!userId) {
            return res.status(400).send(
                {
                    message: "UserId param not sent with request"
                }
            )
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]

        }).populate('users', '-password').populate('latestMessage');

        // sender

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name profile_pic email'
        })


        if (isChat.length > 0) {

            // latest msg
            res.send(isChat[0]);

        }
        else {
            // otherwise 
            // create chat 
            var chatData = {
                chatName: 'sender',
                isGroupChat: false,
                users: [req.user._id, userId]
            };
            try {

                const createdchat = await Chat.create(chatData)

                const fullchat = await Chat.findOne({ _id: createdchat._id }).populate("users", "-password")

                res.status(200).send(fullchat)

            } catch (error) {

                return res.status(500).send(
                    { message: "error getting messages" }
                )
            }

        }

    } catch (error) {
        console.log(error);
        return res.status(500).send(
            { message: "error getting messages" }
        )
    }


}


// fetching all chats for the user 

const fetchchats = async (req, res) => {
    try {


        var chatData = await Chat.find({users: { $elemMatch: { $eq: req.user._id } }}).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt:-1});

        chatData=await User.populate(chatData,{
            path:"latestMessage.sender",
select :"name profile_pic email"
        })


        if (!chatData) {
            res.status(500).send({
                success: false,
                data: chatData
            })
        }



        res.status(200).send({
            success: true,
            data: chatData
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            data: error.message
        })
    }
}


// creating group chat 

const createGroupChat=async(req,res)=>{


   if(!req.body.users || !req.body.name){


    return res.status(400).send({
        message:"please send group name and users "
    })

   }

//    frontend se stringify krkr bhjenge abd yha parse krnge 

var users =JSON.parse(req.body.users)

if(users.length<2){

    return res.status(400).send("more than 2 users required for making a group")

}



users.push(req.user);



try {
    

    const groupchat= await Chat.create({
        chatName:req.body.name,
        isGroupChat:true,
        users:users,
        groupAdmin:req.user
    })

    const fullgroupchat=await Chat.findOne({_id:groupchat._id}).populate("users","-password").populate("groupAdmin","-password");

res.status(200).send(fullgroupchat)


} catch (error) {
    
res.status(500).send(error.message);

}



    



}

const renameGroup=async(req,res)=>{


    try {
        
        const {chatId,chatName}= req.body;

        const updatedChat=await Chat.findByIdAndUpdate(chatId,{
            chatName
        },{new:true}).populate("users","-password").populate("groupAdmin","-password")


if(updatedChat){
        res.status(200).send({
            success:true,
            data:updatedChat
        })
    }
    else{
        res.status(404).send({
            success:false,
            message:"chat not found"
        })
    }
   

    } catch (error) {
        
        console.log(error);

    }


}

const addToGroup=async(req,res)=>{
    try {

        const {chatId,userId}=req.body;

const added =await Chat.findByIdAndUpdate(chatId,{
    $push:{users:userId}
},{new:true}).populate("users","-password").populate("groupAdmin","-password")

if(!added){
    res.status(404).send({success:false,message:"something went wrong adding user"});
}
res.status(201).send({success:true,data:added});
        
    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}


const removeFromGroup=async(req,res)=>{
    try {
        const {chatId,userId}=req.body;

        const removed=await Chat.findByIdAndUpdate(chatId,
            {$pull:{users:userId}},
            {new:true}).populate("users","-password").populate("groupAdmin","-password")

            if(!removed){
                res.status(404).send({success:false,message:"something went wrong removing user"});
            }
        
            res.status(200).send({
                success:true,
                data:removed
            })

    } catch (error) {
        console.log(error);
    }
}



module.exports = { accessChat, fetchchats ,createGroupChat,renameGroup,addToGroup,removeFromGroup}