const express=require('express');
const cors=require('cors');
const connectDB=require('./config/connectDB')
require('dotenv').config()
const router=require('./routes/auth-router')
const userrouter=require('./routes/user-router')
const chatrouter=require('./routes/chat-router')
const messagesrouter=require('./routes/message-router')
const app= express();
const cookieParser = require('cookie-parser');


app.use(cors({

origin:process.env.FRONTEND_URL,
credentials:true


}))

app.use(express.json())
// to get cookies in the browser
app.use(cookieParser());

const PORT=process.env.PORT || 8080;


app.use('/api',router);
  
// user details
app.use('/user',userrouter);

// chat
app.use('/chat',chatrouter);

// messages
app.use('/messages',messagesrouter);

connectDB().then(()=>{
    app.listen(PORT,()=>{

        console.log("server running at ",PORT)
        
        })
        
}).catch((e)=>{

    console.log('connection failed')

})



