import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { serverurl } from '../context/UserData';

function Tasks() {
    const[task,setTask]=useState('');
    const[status,setStatus]=useState('');
    const[loading,setLoading]=useState(false);
    const[tasks,setTasks]=useState([]);
    const[editingTask,setEditingTask]=useState(null);
    const[editTaskName,setEditTaskName]=useState('');
    const[editTaskStatus,setEditTaskStatus]=useState('');
    
    const handleTask=async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            
            if(!task || !status) {
                alert("Please fill all fields");
                setLoading(false);
                return;
            }
            
            console.log("Creating task:", {taskname: task, taskstatus: status});
            const result=await axios.post(`${serverurl}/api/task/createtask`,{
                taskname: task,
                taskstatus: status
            },{withCredentials:true})
            
            console.log("Task created:", result.data);
            alert("Task created successfully!");
            
            // Clear form
            setTask('');
            setStatus('');
            setLoading(false);
            
            // Refresh task list
            fetchTasks();
        } catch (error) {
            console.log("Error creating task:", error);
            alert("Failed to create task. Please try again.");
            setLoading(false);
        }
    }
    
    const fetchTasks = async () => {
        try {
            const result = await axios.get(`${serverurl}/api/task/gettasks`, {withCredentials: true});
            setTasks(result.data.tasks || []);
        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    }
    
    const handleEdit = (taskItem) => {
        setEditingTask(taskItem._id);
        setEditTaskName(taskItem.taskname);
        setEditTaskStatus(taskItem.taskstatus);
    }
    
    const handleUpdate = async (taskId) => {
        try {
            if(!editTaskName || !editTaskStatus) {
                alert("Please fill all fields");
                return;
            }
            
            const result = await axios.put(`${serverurl}/api/task/updatetask/${taskId}`, {
                taskname: editTaskName,
                taskstatus: editTaskStatus
            }, {withCredentials: true});
            
            console.log("Task updated:", result.data);
            alert("Task updated successfully!");
            
            // Reset editing state
            setEditingTask(null);
            setEditTaskName('');
            setEditTaskStatus('');
            
            // Refresh task list
            fetchTasks();
        } catch (error) {
            console.log("Error updating task:", error);
            alert("Failed to update task. Please try again.");
        }
    }
    
    const handleDelete = async (taskId) => {
        if(window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axios.delete(`${serverurl}/api/task/deletetask/${taskId}`, {withCredentials: true});
                alert("Task deleted successfully!");
                fetchTasks();
            } catch (error) {
                console.log("Error deleting task:", error);
                alert("Failed to delete task. Please try again.");
            }
        }
    }
    
    const cancelEdit = () => {
        setEditingTask(null);
        setEditTaskName('');
        setEditTaskStatus('');
    }
    
    useEffect(() => {
        fetchTasks();
    }, []);
  return (
    <div>
        <h1>Task Management</h1>
        
        {/* Add Task Form */}
        <div>
            <h2>Add New Task</h2>
            <form onSubmit={handleTask}>
                <div>
                    <label>Task Name:</label>
                    <input 
                        type='text' 
                        placeholder='Enter the task' 
                        value={task}
                        onChange={(e)=>setTask(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Status:</label>
                    <select 
                        value={status} 
                        onChange={(e)=>setStatus(e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Submit Task"}
                </button>
            </form>
        </div>
        
        {/* Task List */}
        <div>
            <h2>Your Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks found. Create your first task!</p>
            ) : (
                <div>
                    {tasks.map((taskItem, index) => (
                        <div key={taskItem._id || index}>
                            {editingTask === taskItem._id ? (
                                // Edit Mode
                                <div>
                                    <div>
                                        <label>Task Name: </label>
                                        <input 
                                            type="text" 
                                            value={editTaskName}
                                            onChange={(e) => setEditTaskName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>Status: </label>
                                        <select 
                                            value={editTaskStatus}
                                            onChange={(e) => setEditTaskStatus(e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button onClick={() => handleUpdate(taskItem._id)}>
                                            Save
                                        </button>
                                        <button onClick={cancelEdit}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div>
                                    <h3>{taskItem.taskname}</h3>
                                    <p>Status: {taskItem.taskstatus}</p>
                                    {taskItem.createdAt && (
                                        <small>Created: {new Date(taskItem.createdAt).toLocaleDateString()}</small>
                                    )}
                                    <div>
                                        <button onClick={() => handleEdit(taskItem)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(taskItem._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Tasks