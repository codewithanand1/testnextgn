import express from "express"
import isAuth from "../middleware/isAuth.js";
import { CreateTask, GetTasks, UpdateTask, DeleteTask } from "../controllers/task.controller.js";

const taskRoute=express.Router();

taskRoute.post("/createtask",isAuth,CreateTask)
taskRoute.get("/gettasks",isAuth,GetTasks)
taskRoute.put("/updatetask/:taskId",isAuth,UpdateTask)
taskRoute.delete("/deletetask/:taskId",isAuth,DeleteTask)

export default taskRoute