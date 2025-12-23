import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserData'
import { serverurl } from '../context/UserData'

function Signup() {
    const [data,setData]=useState({
        name:'',
        age:'',
        email:'',
        password:''
    })
    const navigate=useNavigate()
    const {getCurrentUser} = useContext(UserContext)

    const handleSubmit=async (e) => {
        try {
            e.preventDefault()
            console.log(data)
            const result=await axios.post(`${serverurl}/api/auth/signup`,data,{withCredentials:true})
            console.log(result.data)
            
            // Signup successful होने पर user data को update करें
            await getCurrentUser();
            navigate("/home")
        } catch (error) {
            console.log(error);
            alert("Signup failed. Please try again.");
        }
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
             <div>
                <label>Name:</label>
                <input type="text" placeholder='enter your name' onChange={(e)=>setData({...data,name:e.target.value})}/>
             </div>




             <div>
                <label>age:</label>
                <input type="number" placeholder='enter your number' onChange={(e)=>setData({...data,age:e.target.value})}/>
             </div>




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
    </div>
  )
}

export default Signup