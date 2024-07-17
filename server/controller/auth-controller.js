const User=require('../model/UserModel')
const bcrypt = require("bcryptjs");
const { request } = require('express');
const jwt=require('jsonwebtoken')

require('dotenv').config();

const register=async(req,res)=>{


try {

    const {name,email,password,profile_pic}=req.body;


 const userExists=await User.findOne({email});

 if(userExists){

    return res.status(400).send({
message:"user already exist",
error:true
    })



 }


 const newUser=new  User({name,email,password,profile_pic});

await newUser.save();

 return res.status(201).json({
    message:"New User Created",
    data:newUser,
    error:false
 })


    
} catch (error) {
    
    return res.status(500).json({
        message:error.message|| error,
        error:true
    })

}






}



const login=async(req,res)=>{

try {

    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){

        return res.status(400).json({
            message:"user not found",
            error:true
        })

    }


  const userExist= await user.comparepassword(password);

  if(!userExist){

return res.status(400).json({
    message:"invalid credentials",
    error:true
})


  }

  const token=await user.generateToken();



// set the token inside cookies 

const cookieoptions={
    expires: new Date(Date.now()+2456000000),
    http:true,
    // secure:true
}




  return res.cookie('token',token,cookieoptions).status(200).json({

    message:"login success",
success:true,
    user:{ _id: user._id,
        name: user.name,
        email: user.email,},
        token

  })

    
} catch (error) {

    console.log(error);
    
}



}



const logout=async(req, res) => {
try {
    // remove the cookies 

  
    const cookieoptions={
        expires: new Date(Date.now()+2456000000),
        http:true,
        // secure:true 
    }



    return res.cookie('token','',cookieoptions).status(200).json({
        message:"User logged out",
        success:true})
    
} catch (error) {
    return res.status(500).json({
        message: error.message || error,
        error: true
    })
}


}


const updateuser=async(req, res) => {

try {
    
const {name, email, password,profile_picture} = req.body;

// console.log(req.user);

const updateuser=await User.findByIdAndUpdate(req.user._id,{name,email,password,profile_picture},{new:true,runValidators:true});

return res.status(200).json({
    message:"user updated succefully",
data:updateuser,
success: true
})

} catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true
    })
}


}

const mydetails=async(req, res) => {
    try {
      
        return res.status(200).json({
            message:"User details",
            data:req.user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}



module.exports={register,login,logout,updateuser,mydetails}