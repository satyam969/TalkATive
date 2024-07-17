const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_pic: {
        type:String,default:""
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },

}, { timestamps: true })



userSchema.pre('save',async function (){

    const user=this;

    if(!user.isModified){

        next();
    }

try {


const saltround=await bcrypt.genSalt(10);

const hash_password=await bcrypt.hash(user.password,saltround);

user.password=hash_password;

// user.save();
    
} catch (error) {
    
    console.log("error hashing",error);

}

   


})



userSchema.methods.comparepassword=async function(password){


        
       return bcrypt.compare(password,this.password)

   


}

// normal function ki hi trh kro wrna error

userSchema.methods.generateToken=async function(){

try {
 
  

    return  jwt.sign(


       {
         userID: this._id,
                email: this.email,
},
process.env.JWT_SECRET_KEY,
{
    expiresIn: "30d"
}

    )


    
} catch (error) {
    

    console.log(error);

}


}







const User = new mongoose.model('User', userSchema);


module.exports = User;

