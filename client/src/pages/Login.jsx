import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {toast} from "react-toastify";
import { useState } from "react";
import "../styles/AuthStyles.css";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const location = useLocation();

    const URI=import.meta.env.VITE_URL;



    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        const res = await axios.post(`${URI}/api/login`, {
          email,
          password,
        },        {
          withCredentials: true,
        }
);

       

        
  
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);

          // document.cookie = `token=${res.data.token}; path=/; Secure; HttpOnly`;

          navigate(location.state || "/");



        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };



  return (
    <div className="form-container  m-3">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
         

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>

<div className="register bg-light m-2 p-2">

Don't have an account? <Link className="text-prim" to="/register">Register</Link> 
</div>

{/* <div className="forgot-password">
Forgot Password? <a href="/forgot-password">Reset Password</a>

</div> */}

      </div>
  )
}

export default Login
