const express = require('express');


const router=express.Router();

const {allusers}=require("../controller/user-controller")
const userDetails = require('../middleware/auth-middleware')



router.route('/').get(userDetails,allusers)


module.exports = router 