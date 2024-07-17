import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { useChat } from "../context/ChatProvider";

const Home = () => {

  const URI=import.meta.env.VITE_URL;
const navigate=useNavigate();

const{setUser}=useChat();

  const logout=async()=>{
    try {
      await axios.get(`${URI}/api/logout`, {
        withCredentials: true,
      });
     
setUser(null);

      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  }


  const user=useChat();


  if(!user){
    navigate('/login');
  }



  return (
    <div>
      Welcome Home 

<button onClick={logout}>LogOut</button>


     

    </div>
  )
}

export default Home
