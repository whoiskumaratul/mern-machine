import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handlelogin = async () =>{
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username, password
      });

      if(response.status  === 200){
        console.log("Login successful")
        return navigate('/dashboard')
        
      } else  {
        console.log("Invalid credentials")
      
        
      }
    }
    catch(error) {
      console.log("login error or invalid credentials", error.message)
       alert("Invalid credentials or please enter the value first");
        // Clear input boxes
        setUserName("");
        setPassword("");
    }
  }


  return (
    <div>
    <div className=' grid lg:grid-cols-1 text-left ml-5  '>
        <div className=' uppercase tracking-wide text-gray-700 text-xs font-bold '>
            <h1 className='mt-5' >/Login Page</h1>
          </div>
           
          </div>


     <div className="flex grid  grid-cols-1 lg:w-[450px] m-5 bg-yellow-400  p-2 shadow-lg shadow-indigo-900/40 ">
  <div className=" text-white text-center p-2"> 
      Login Panel</div>

 <div className="bg-white h-auto md:grid-cols-6 text-center">

 <div className="grid grid-rows-3 grid-flow-col ">

   
    
    <div className='pl-5 pr-5 pt-12 '>
      <input type="text" className='w-full p-2 border-2 text-xs/[16px]  font-semibold ' placeholder='User Name' 
      value={username}
      onChange={(e) => setUserName(e.target.value)}
  required
      />
    </div>

    <div className='pl-5 pr-5  pt-1'>
      <input type="password" className='w-full p-2 border-2 text-xs/[16px] font-semibold ' placeholder='Password' 
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     required

      />
    </div>

    <div className='pl-5 pr-5  pt-2'>
      <button type="button" className=' float-right pl-5 pr-5 pt-1 pb-1 text-center text-white text-sm bg-blue-600 font-semibold hover:bg-blue-500 '
      onClick={handlelogin}
      >  Login</button>
  
   </div>
  
   
   </div>   
  </div>
  </div>
  
  </div>
  )
}

export default Login 