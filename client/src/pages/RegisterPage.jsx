import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import "../styles/AuthStyles.css";
import { IoClose } from "react-icons/io5";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [profile_pic,setProfilePicture] = useState("");
  const navigate = useNavigate();


  const URI=import.meta.env.VITE_URL; // Imported from .env file



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URI}/api/register`, {
        name,
        email,
        password,
        profile_pic,
      });
      if (res) {
        toast.success(res.data && res.data.message);
        navigate("/login");}
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const clearphoto=(e)=>{

   setProfilePicture(null);
   const fileInput = document.getElementById('profile_pic');
   fileInput.value = ''; 


  }


  return (
  
    <div className="form-container m-3">

<h1 className="mb-2 text-prim font-bold bg-light shadow-md p-2 ">Welcome To Chat App</h1>

    <form onSubmit={handleSubmit}>
      <h4 className="title ">REGISTER FORM</h4>
      <div className="mb-3">
        <input
          type="text"
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Your Name"
          required
          autoFocus
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Your Email "
          required
        />
      </div>
      <div className="mb-3">
        <input
        name='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Your Password"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="profile_pic">Photo :
          <div className="h-14 p-2  flex justify-center items-center border rounded  hover:bg-prim"><p className="text-sm max-w-[300px] text-ellipsis ">{profile_pic?profile_pic.name : "Upload Profile Picture"}</p></div>
        </label>
        <input
         type="file"
         id="profile_pic"
         name="profile_pic"
         accept="image/*"
         // files array hota hai
         onChange={(e) => setProfilePicture(e.target.files[0])}
        hidden
        />
{profile_pic && (
                  <div className="text-center">
<div className="text-lg w-10 border hover:text-prim" onClick={(e)=>{
  clearphoto(e);
}}><IoClose style={{ fontSize: "2em" }} /></div>
                    <img
                    // URL propt hoti hai browser ki jisme se hm ye adress acess kr skte hai 
                      src={URL.createObjectURL(profile_pic)}
                      alt="profile_pic"
                      height={"200px"}
                  
                      className="img img-responsive"
                    />
                  </div>
                )}


      </div>
     
      <button type="submit" className="btn btn-primary">
        REGISTER
      </button>
    </form>
    <p className="bg-light m-2 border rounded p-2">Already have account ? <Link className="text-prim" to ={'/login'}>Login</Link></p>
  </div>
  )
}

export default RegisterPage
