import axios from 'axios';
import React, { useState } from 'react'
import { serverurl } from '../App';

function Tasks() {
    const[task,setTask]=useState('');
    const[status,setStatus]=useState('');
    const[taskid,settaskid]=useState('')
    const handleTask=async () => {
        try {
            e.preventDefault()
            // e.preventDefault();
            console.log("EEEEEEEEEEEEE");
            const result=await axios.post(`${serverurl}/api/task/createtask`,{task,status},{withCredentials:true})
            console.log(result.data);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h1>Add the task</h1>
        <form onSubmit={handleTask}>
            <div>
            <label>TaskName</label>
            <input type='text' placeholder='Enter the task' onChange={(e)=>setTask(e.target.value)}/>
        </div>

        <div>
            <label>Status:</label>
            <input type='text' placeholder='Enter status' onChange={(e)=>setStatus(e.target.value)}/>
        </div>
        <button type="submit">SumbitTask</button>
        </form>
        
    </div>
  )
}

export default Tasks