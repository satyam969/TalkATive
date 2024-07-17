const User = require("../model/UserModel");
const jwt=require("jsonwebtoken");
const userDetails = async (req, res,next) => {
    try {
        const token =  req.cookies && req.cookies.token ?req.cookies.token : "";

        // console.log(token);

        if (!token) {
            return res.status(401).json({
                message: "Session expired",
                logout: true,
            });
        }

      
     

        const decode =  await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                logout: true,
            });
        }

   
        const user = await User.findById(decode.userID).select('-password');

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }


        // creating new fields 

        req.user=user;

next();


        
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
        });
    }
};


module.exports=userDetails;