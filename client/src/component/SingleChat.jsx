import { Box, Button, FormControl, IconButton, Input, Spinner, Text } from "@chakra-ui/react";
import { useChat } from "../context/ChatProvider"
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogic";
import ProfileModel from "./ProfileModel";
import UpdateGroupChatModel from "./miscallaneous/UpdateGroupChatModel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";


const SingleChat = ({fetchAgain,setFetchAgain}) => {
// state for all messages
const[message,setMessage]=useState([]);
const[loading,setLoading] = useState(false);

// new message 
const[newMessage,setNewMessage] = useState("")

    const {user,selectedChat,setSelectedChat}=useChat();

const URI=import.meta.env.VITE_URL;

const sendMessage=async(e)=>{
if(e.key==="Enter" && newMessage){


try {
  setNewMessage("");
const {data}=await axios.post(`${URI}/messages`,{content:newMessage,chatId:selectedChat._id},{
  withCredentials: true,
})

console.log(data);

setMessage([...message,data])


} catch (error) {
  toast.error("Something went wrong")
  console.log(error);

}


}


}

// fetch all messages 
const fetchMessage=async()=>{

  if(!selectedChat)return;

  try {

    setLoading(true);

    const {data}=await axios.get(`${URI}/messages/${selectedChat._id}`,{
      withCredentials: true,
    });

    setMessage(data);

  
    setLoading(false);
    
    console.log(data);

  } catch (error) {
    toast.error("Error Getting Messages")
  }
}


useEffect(()=>{


fetchMessage();

},[selectedChat])




const typingHandler=(e)=>{

  setNewMessage(e.target.value);


// Typing Indicator Logic (typing...)

}



  return (
    <>
 {selectedChat?(<>
 <Text
  fontSize={{ base: "28px", md: "30px" }}
  pb={3}
  px={2}
  w="100%"
  fontFamily="Work sans"
  d="flex"
  justifyContent={{ base: "space-between" }}
  alignItems="center"
 >
    <IconButton 
     d={{ base: "flex", md: "none" }}
     icon={<ArrowBackIcon />}
     onClick={() => setSelectedChat("")}
    />
    {!selectedChat.isGroupChat?(
        <>{getSender(user,selectedChat.users)}
        <ProfileModel user={getSenderFull(user,selectedChat.users)}/>
        </>
    ):(
        <>
        {selectedChat.chatName.toUpperCase()}
<UpdateGroupChatModel fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain} fetchMessage={fetchMessage} />
        </>
    )}
 </Text>
<Box
  d="flex"
  flexDir="column"
  justifyContent="flex-end"
  p={3}
  bg="#E8E8E8"
  w="100%"
  h="100%"
  borderRadius="lg"
  overflowY="hidden"
>
 {loading? (<Spinner
  size="xl"
  w={20}
  h={20}
  alignSelf="center"
  margin="auto" />) : (

<div className="flex flex-col overflow-y-scroll scrollbar-width-none ">

{ <ScrollableChat message={message} />}

</div>

 )}

<FormControl onKeyDown={sendMessage} isRequired mt={3}>

<Input
 variant="filled"
 bg="#E0E0E0"
 placeholder="Enter a message.."
 value={newMessage}
 onChange={typingHandler}
/>

</FormControl>

</Box>

 </>):(
<Box d="flex" alignItems="center" justifyContent="center" h="100%">
    <Text fontSize="3xl" pb={3} fontFamily="Work sans">Select a chat to view its messages</Text>

</Box>

 )}
    </>
  )
}

export default SingleChat
