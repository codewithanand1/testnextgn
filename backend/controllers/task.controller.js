import Task from "../modals/task.models.js";


export const CreateTask=async (req,res) => {
try {
        const {taskname,taskstatus}=req.body;
      if(!taskname||!taskstatus)
      {
        return res.status(404).json({message:"fill all fields"})
      }

      const newtask=await Task.create({
        taskname,
        taskstatus
      })
      return res.status(200).json(newtask);
} catch (error) {
    return res.status(500).json({message:"Task generate error"});
}    
}