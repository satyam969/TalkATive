import { Tooltip,Avatar } from "@chakra-ui/react";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/ChatLogic"
import { useChat } from "../context/ChatProvider";
import { useEffect } from "react";


const ScrollableChat = ({message}) => {

    const {user}=useChat();



  return (
    <div className="w-100 h-100 scroll-y-auto scroll-x-none ">
      {/* {JSON.stringify(message, null, 4)}  */}
      {message?.map((m,i)=>(
       <div className="flex" key={m._id}>    
{
(
  isSameSender(message,m,i,user._id)
|| 
isLastMessage(message,i,user._id)
)
&&
(
    <Tooltip 
    label={m.sender.name}
    placement="bottom-start"
    hasArrow
    >
       <Avatar
       mt="7px"
       mr={1}
       size="sm"
       cursor="pointer"
       name={m.sender.name}
       src={m.sender.profile_picture}
       /> 
    </Tooltip>
)
      }

<span   style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(message, m, i, user._id),
                marginTop: isSameUser(message, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}>

{m.content}

              </span>

       </div>
      ))}
    </div>
  )
}

export default ScrollableChat
