import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { useChat } from "../context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../userAvator/UserListItem"

const SideDrawer = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const[search,setSearch]=useState("");
  const [searchResult,setSearchResult]=useState([])
const[loading,setLoading] = useState(false)
const[loadingChat,setLoadingChat] = useState(false);
const {user,setSelectedChat,setChats,chats}=useChat();

const URI=import.meta.env.VITE_URL;

const navigate=useNavigate();


const accessChat=async(userId)=>{
try {
  setLoadingChat(true);

// creating new chat
const {data}=await axios.post(`${URI}/chat`,{userId}, {
  withCredentials: true,
})

// if already chat present so append
if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats])

setSelectedChat(data);

setLoadingChat(false);



onClose();

} catch (error) {
  
  toast.error("Error Getting Chats");

}
}



const handleSearch=async(e)=>{
e.preventDefault();

try {

  setLoading(true);

  if(!search){
    toast.error("Please enter a username");
    return;
  }


 

const response=await axios.get(`${URI}/user/?search=${search}`, {
  withCredentials: true,
});

setLoading(false);

setSearchResult(response.data.data);


} catch (error) {
  
  toast.error("something went wrong")

}



}

const logouthandler=()=>{

   
localStorage.removeItem('user');

navigate("/login")

}

  return (
    <>
      <Box
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10 px 5px 10px"
      borderWidth="5px"
      >
        <Tooltip label='Search Users to chat' hasArrow placement="bottom-end">

<Button variant='ghost' onClick={onOpen}>
  {/* base md depends upon size .. */}
  <FaSearch />
  <Text d={{base:"none",md:"flex"}} px="4" >
    Search User
  </Text>
  </Button>

        </Tooltip>

        <Text>Talk With's</Text>

<div>
  <Menu>
<MenuButton p={1} >
<BellIcon fontSize="2xl" m={1}/>
</MenuButton>
{/* <MenuList></MenuList> */}
  </Menu>

</div>
<Menu>
<MenuButton as={Button} rightIcon={<ChevronDownIcon/>} >
<Avatar size="sm" cursor='pointer' name={user.name} src={user.profile_pic} />
</MenuButton>
<MenuList>
  {/* aisa model hai jo reusable hai  */}
  <ProfileModel user={user}>
  <MenuItem>My Profile</MenuItem>
  </ProfileModel>
  <MenuDivider/>
  <MenuItem onClick={()=>{logouthandler()}}>Logout</MenuItem>
</MenuList>
</Menu>
      </Box>


<Drawer placement="left" onClose={onClose} isOpen={isOpen} > 
  <DrawerOverlay/>
<DrawerContent>

  <DrawerHeader borderBottomWidth="1px" >
Search Users 
  </DrawerHeader>

  <DrawerBody>
<Box d="flex" pb={2} >
<Input placeholder="Search by name or email" 
mr={2}
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
<Button 
onClick={(e)=>handleSearch(e)}
>
Go
</Button>
</Box>
{loading?(<ChatLoading/>):

(searchResult && searchResult?.map((user,index)=>(
   <UserListItem key={user._id}
   
   user={user}
 handleFunction={()=>accessChat(user._id)}
   
   />
  ))
 
)

}
{loadingChat && <Spinner ml="auto" d="flex" />}
  </DrawerBody>
  </DrawerContent>
   </Drawer>



    </>
  )
}

export default SideDrawer