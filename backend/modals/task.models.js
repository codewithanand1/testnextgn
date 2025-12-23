import mongoose from "mongoose";

const taskSchema=mongoose.Schema({
    taskname:{
        type:String,
        required: true
    },
    taskstatus:{
        type:String,
        required: true,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const Task=mongoose.model("Task",taskSchema);

export default Task 