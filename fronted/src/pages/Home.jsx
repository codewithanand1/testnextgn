import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { serverurl } from '../App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Home() {
    const [user,setUser]=useState({});
      const navigate=useNavigate()
    const getCurrentUser=async () => {
        try {
            const result=await axios.get(`${serverurl}/api/user/get`,{withCredentials:true})
            console.log(result.data);
            setUser(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout=async () => {
      try {
        const result=await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
        console.log(result.data);
        navigate("/login")
      } catch (error) {
        console.log(error)
      }

    }

    useEffect(()=>{
        getCurrentUser()
    },[])


  return (
    <div>Welcome to Home Page Current UserLogin in the wedsite<h1>{user?.name},email:{user?.email}</h1>
    <button onClick={handleLogout}>Logout</button>

    <h2>Add the task <Link to="/task">Addtask</Link></h2>
    </div>
  )
}

export default Home