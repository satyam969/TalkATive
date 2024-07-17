import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useChat } from "../context/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvator/UserListItem";
import UserBadgeItem from "../userAvator/UserBadgeItem";
import { toast } from "react-toastify";


const GroupChatModel = ({children}) => {
    const [groupChatName,setgroupChatName]=useState();
const [selectedUser,setSelectedUser]=useState([]);
const[search,setSearch] = useState("");
const[searchResult,setSearchResult] = useState([])
const[loading,setLoading]=useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

const{user,chats,setChats}=useChat();

const URI=import.meta.env.VITE_URL;

const handleSearch=async(query)=>{
setSearch(query);

if(!query){
  return;
}

try {

  setLoading(true);

  const {data}= await axios.get(`${URI}/user/?search=${query}`,{
    withCredentials: true,
  })


  setLoading(false);
  setSearchResult(data.data);
  
} catch (error) {
  toast.error("Failed to load the Chats ")
  console.log(error);
}

}

const handleSubmit=async()=>{
  if(!groupChatName || !selectedUser ){
    toast.error("Please fill all the fields");
    return;
  }

  try {

    const {data} = await axios.post(`${URI}/chat/group`,{name:groupChatName,users:JSON.stringify(selectedUser.map(u=>u._id))},{
      withCredentials: true,
    })
  
   
    
    setChats([...chats,data]);

    onClose();
    toast.success("new Group Created")

  } catch (error) {
    toast.error("Failed to create Group Chat")
    console.log(error);
  }
}


const handleGroup=(userToAdd)=>{

if(selectedUser.includes(userToAdd)){
  toast("user already in group")
  return;
}

setSelectedUser([...selectedUser,userToAdd]);

}

const handleDelete=(userToDelete)=>{

setSelectedUser(selectedUser.filter(u=>u._id!==userToDelete._id));

}




  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          fontSize="35px" 
          fontFamily="Work sans"
          d="flex"
          justifyContent="centre"
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          d="flex" flexDir="column" alignItems="center"
          >
        <FormControl>
          <Input placeholder="Chat Name" mb={3}
          onChange={(e)=>setgroupChatName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Input placeholder="Add Users eg: Zayn Stark Piyush Virat Kohli " mb={1}
          onChange={(e)=>handleSearch(e.target.value)}
          />
        </FormControl>
<Box w="100%" d="flex" flexWrap="wrap">
{selectedUser.map(u=>(

<UserBadgeItem key={u._id}
user={u}
handleFunction={()=>handleDelete(u)}
/>

))}
</Box >
{loading? <Spinner/> : (
  searchResult?.slice(0,4).map((user)=>(
   <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
  ))
)}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModel
