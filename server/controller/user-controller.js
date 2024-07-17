const User=require('../model/UserModel')

const mongoose = require('mongoose')

const allusers=async(req,res)=>{

    try {

        if(req.query.search){

            // console.log(req.query.search);

            const keyword=req.query.search? {
                $or:[
                    // options i case sensitive
                    {name:{$regex:req.query.search,$options: 'i'}},
                    {email:{$regex:req.query.search,$options: 'i'}}
                ]
            }:{};
// return;
const users=await User.find(keyword).find({_id:{$ne:req.user._id}})

res.status(200).json({
    success:true,
    data:users})

        } 
      else { const alluser=await User.find().find({_id:{$ne:req.user._id}});
        
        res.status(200).json({
            success:true,
            data:alluser})}


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:" Error fetching all users "})
    }


}




module.exports = {allusers}