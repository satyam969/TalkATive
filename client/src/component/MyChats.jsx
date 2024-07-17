import { useEffect, useState } from "react";
import { useChat } from "../context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from '../component/ChatLoading'
import { getSender } from "../config/ChatLogic";
import GroupChatModel from "../group/GroupChatModel";

const MyChats = ({fetchAgain}) => {

  const[logged,setLogged]=useState();


  const {user,setUser,selectedChat,setSelectedChat,chats,setChats}=useChat();

// all chats of the user
const URI=import.meta.env.VITE_URL;

const fetchchats=async()=>{
  try {
    

    const {data}=await axios.get(`${URI}/chat`, {
      withCredentials: true,
    });
setChats(data.data);


  } catch (error) {
    toast.error("Some Error Occured")

  }
}


useEffect(()=>{
  fetchchats();
},[fetchAgain])

  return (
    <Box
    d={{base:selectedChat? "none" :"flex",md:"flex"}}
    flexDir="column"
    alignItems="centre"
    p={3}
    bg="white"
    w={{base:"100%",md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    
    >
   <Box
     pb={3}
     px={3}
     fontSize={{ base: "28px", md: "30px" }}
     fontFamily="Work sans"
     d="flex"
     w="100%"
     justifyContent="space-between"
     alignItems="center"
   >
My Chats
<GroupChatModel>
       <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>  
          </GroupChatModel>      
   </Box>
<Box
 d="flex"
 flexDir="column"
 p={3}
 bg="#F8F8F8"
 w="100%"
 h="100%"
 borderRadius="lg"
 overflowY="hidden"
>

{chats?(
<Stack overflowY='scroll'>

{chats.map((chat)=>(

<Box onClick={()=>setSelectedChat(chat)}
 cursor="pointer"
 bg={selectedChat === chat ? "#02d9a1" : "#E8E8E8"}
 color={selectedChat === chat ? "white" : "black"}
 px={3}
 py={2}
 borderRadius="lg"
 key={chat._id}>
<Text>{!chat.isGroupChat ? getSender(user,chat.users) :chat.chatName
}</Text>
</Box>



))}



</Stack>
):(<ChatLoading/>)}

</Box>

    </Box>
  )
}

export default MyChats
