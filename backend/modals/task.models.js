import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    taskname:{
        type:String,
    },
    taskstatus:{
        type:String
    }
})

const Task=mongoose.model("task",taskSchema);


export default Task 