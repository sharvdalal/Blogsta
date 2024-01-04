import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import axios from 'axios'
import { URL } from "../url";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()



  const handleRegister = async (e)=>{
    
    try {
      const res = await axios.post(URL + "/api/auth/register", {username, password, email});
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password)
      setError(false);
      navigate('/login');
     

      
    } catch (error) {
      console.log(error);
      setError(true);
     
      
    }
  }

  // console.log(username, email, password);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to={"/"}>Blogsta</Link>
        </h1>
        <h3>
          <Link to={"/login"}>Login</Link>
        </h3>
      </div>

      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Register Here! Blogs are Wondering who are you?{" "}
          </h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className=" w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter Your Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter Your Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter Your Password"
          />
          <button onClick={handleRegister} className=" w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">
            Register
          </button>
          {error && <h3 className="text-red-500 text-sm">Something went Wrong</h3>}
          <div className="flex justify-center items-center space-x-4">
            <p>Alreday a Blogster?</p>
            <p className="text-gray-600 hover:text-black">
              {" "}
              <Link to={"/login"}>Log In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
