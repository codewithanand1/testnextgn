import express from "express"
import isAuth from "../middleware/isAuth.js";
import { CreateTask } from "../controllers/task.controller.js";


const taskRoute=express.Router();


taskRoute.post("/createtask",isAuth,CreateTask)


export default taskRoute