import { ViewIcon } from "@chakra-ui/icons"
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react"
import { useChat } from "../../context/ChatProvider"
import { useState } from "react"
import UserBadgeItem from "../../userAvator/UserBadgeItem"
import { toast } from "react-toastify"
import axios from "axios"
import UserListItem from "../../userAvator/UserListItem"


const UpdateGroupChatModel = ({fetchAgain,setFetchAgain,fetchMessage}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
const [groupChatName,setGroupChatName]=useState("")
const[search,setSearch] = useState("");
const[searchResult,setSearchResult] = useState([])
const[loading,setLoading]=useState(false)
const[renameloading,setRenameloading] = useState(false)

const URI=import.meta.env.VITE_URL;

const{selectedChat,setSelectedChat,user}=useChat()

const handleRename=async()=>{
    if(!groupChatName){
        toast.info("please enter the new name for group")
        return;
    }
try {

    const id=selectedChat._id;

    setRenameloading(true);

const{data}=await axios.put(`${URI}/chat/renames`,{chatId:id,
    chatName:groupChatName},{
    withCredentials: true,
})


setSelectedChat(data.data);
setFetchAgain(!fetchAgain)
setRenameloading(false)

toast.success("Group Chat renamed successfully")

    
} catch (error) {

    console.log(error);
    toast.error("Something Went Wrong")
    setRenameloading(false);
    
}

setGroupChatName("")

    }

    const handleAdd=async(userId,chatId)=>{

        if(selectedChat.users.find((u) => u._id === userId)){
toast.error("user already exists")
return;
        }
        if (selectedChat.groupAdmin._id !== user._id) {
           toast.error("You Are Not A Group Admin")
            return;
          }

        try {
        
setLoading(true);
const {data}=await axios.put(`${URI}/chat/groupadd`,{chatId,userId},{
    withCredentials: true,
})

setSelectedChat(data.data);
setFetchAgain(!fetchAgain)
setLoading(false)

        } catch (error) {
            toast.error("Something Went Wrong")
            setLoading(false);
            console.log(error);
        }

        setGroupChatName("");

    }

    const handleRemove=async(userToDelete)=>{

        if(!userToDelete){
            toast.dark("Please select a user to remove")
            return;
        }
        if (selectedChat.groupAdmin._id !== user._id && userToDelete._id !== user._id) {

         toast.error("Only admins can remove someone!");

return;
        }
try {

    setLoading(true);
    const {data}=await axios.put(`${URI}/chat/groupremove`,{chatId:selectedChat._id,userId:userToDelete._id},{
        withCredentials: true,
    })

  
    userToDelete._id === user._id ? setSelectedChat() : setSelectedChat(data.data);



    setFetchAgain(!fetchAgain);
    setLoading(false);
    // after removing someone fetch the message 
fetchMessage();

} catch (error) {
    toast.error("Something Went Wrong")
    setLoading(false);
    console.log(error);

}

    }

    const handleSearch=async(query)=>{
setSearch(query)
        if(!query){
            return;
        }

        try {
            
setLoading(true);
            const {data}=await axios.get(`${URI}/user/?search=${query}`,{
                withCredentials: true,
            })

           

            setLoading(false);
            setSearchResult(data.data);


        } catch (error) {
            
        }

    }

    return (
      <>
        <IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen} />
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
             fontSize="35px"
             fontFamily="Work sans"
             d="flex"
             justifyContent="center"
            >{selectedChat.chatName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <Box>
               {selectedChat.users.map(u=>(
                <UserBadgeItem key={u._id}
user={u}
handleFunction={()=>handleRemove(u)}
/>
               ))}

             </Box>
             <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading?(<Spinner size="lg" />):

(searchResult && searchResult?.map((user,index)=>(
   <UserListItem key={user._id}
   
   user={user}
 handleFunction={()=>{handleAdd(user._id,selectedChat._id)}}
   
   />
  ))
 
)

}
            </ModalBody>
  
            <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default UpdateGroupChatModel
