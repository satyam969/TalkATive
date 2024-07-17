import { Box } from "@chakra-ui/react";
import { useChat } from "../context/ChatProvider"
import SideDrawer from "../component/SideDrawer";
import MyChats from "../component/MyChats";
import ChatBox from "../component/ChatBox";
import { useState } from "react";



const ChatPage = () => {

    const{user}=useChat();

    // state so that when we leave a group from the chatBox page 
const[fetchAgain,setFetchAgain]=useState(false);

  return (
    <div className="w-full ">
      {user && <SideDrawer/>}

<Box 
d='flex'
justifyContent='space-between'
w='100%'
h='91.5vh'
p='10px'
>

{user && <MyChats fetchAgain={fetchAgain} />}
{user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}

</Box>

    </div>
  )
}

export default ChatPage
