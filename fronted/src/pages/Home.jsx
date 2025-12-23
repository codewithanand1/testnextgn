import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { serverurl } from '../App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserData';
function Home() {
   const{userdata,setUserData}=useContext(UserContext)
   const navigate=useNavigate()
    const handleLogout=async () => {
      try {
        const result=await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
        console.log(result.data);
        navigate("/login")
      } catch (error) {
        console.log(error)
      }

    }
  return (
    <div>Welcome to Home Page Current UserLogin in the wedsite<h1>{userdata?.name},email:{userdata?.email}</h1>
    <button onClick={handleLogout}>Logout</button>

    <h2>Add the task <Link to="/task">Addtask</Link></h2>
    </div>
  )
}

export default Home