const express=require('express')

const router=express.Router()

const {register, login,  logout, updateuser, mydetails}=require('../controller/auth-controller')
const userDetails = require('../middleware/auth-middleware')


router.route('/register').post(register)


router.route('/login').post(login)



router.route('/logout').get(logout)

router.route('/detail').get(userDetails,mydetails);

router.route('/updateuser').patch(userDetails,updateuser)

module.exports=router;