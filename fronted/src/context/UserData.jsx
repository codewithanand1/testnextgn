import React, { createContext, useState } from 'react'
import { useEffect } from 'react';
import axios from "axios"

export const serverurl="http://localhost:8000"
export const UserContext=createContext()

function UserData({children}) {
    const[userdata,setUserData]=useState(null);
    const[loading,setLoading]=useState(true);
    
    const getCurrentUser=async () => {
        try {
            const result=await axios.get(`${serverurl}/api/user/get`,{withCredentials:true})
            console.log(result.data);
            setUserData(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setUserData(null)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getCurrentUser()
    },[])
     
    const value={userdata,setUserData,getCurrentUser,loading}
  return (
    <div>
<UserContext.Provider value={value}>
  {children}
</UserContext.Provider>
    </div>
  )
}

export default UserData