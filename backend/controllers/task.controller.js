import Task from "../modals/task.models.js";

export const CreateTask=async (req,res) => {
    try {
        const {taskname,taskstatus}=req.body;
        const userId = req.userId; // From auth middleware
        
        console.log("Creating task:", {taskname, taskstatus, userId});
        
        if(!taskname||!taskstatus) {
            return res.status(400).json({message:"Please fill all fields"})
        }

        const newtask=await Task.create({
            taskname,
            taskstatus,
            userId // Associate task with user
        })
        
        console.log("Task created successfully:", newtask);
        return res.status(201).json({
            message: "Task created successfully",
            task: newtask
        });
    } catch (error) {
        console.log("Task creation error:", error);
        return res.status(500).json({message:"Task generation error"});
    }    
}

export const GetTasks = async (req, res) => {
    try {
        const userId = req.userId;
        const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
        
        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks: tasks
        });
    } catch (error) {
        console.log("Get tasks error:", error);
        return res.status(500).json({message: "Error fetching tasks"});
    }
}

export const UpdateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { taskname, taskstatus } = req.body;
        const userId = req.userId;
        
        if(!taskname || !taskstatus) {
            return res.status(400).json({message: "Please fill all fields"});
        }
        
        const task = await Task.findOne({ _id: taskId, userId });
        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }
        
        const updatedTask = await Task.findByIdAndUpdate(
            taskId, 
            { taskname, taskstatus }, 
            { new: true }
        );
        
        return res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        console.log("Update task error:", error);
        return res.status(500).json({message: "Error updating task"});
    }
}

export const DeleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.userId;
        
        const task = await Task.findOne({ _id: taskId, userId });
        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }
        
        await Task.findByIdAndDelete(taskId);
        
        return res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.log("Delete task error:", error);
        return res.status(500).json({message: "Error deleting task"});
    }
}