import axios from 'axios'
import { name } from 'ejs'
import React, { useState } from 'react'
import { serverurl } from '../App'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [data,setData]=useState({
        email:'',
        password:''
    })

 const navigate=useNavigate()
    const handleSubmit=async (e) => {
        try {
            e.preventDefault();
            console.log(data);
            const result=await axios.post(`${serverurl}/api/auth/login`,data,{withCredentials:true});
            console.log(result.data);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
             <div>
                <label>Email:</label>
                <input type="email" placeholder='enter your email' onChange={(e)=>setData({...data,email:e.target.value})}/>
             </div>


             <div>
                <label>password:</label>
                <input type="password" placeholder='enter your password' onChange={(e)=>setData({...data,password:e.target.value})}/>
             </div>
             <button type="submit">Submit</button>
        </form>
        <h3>If you does not have account please <Link to="/signup">Signup</Link></h3>
    </div>
  )
}

export default Login