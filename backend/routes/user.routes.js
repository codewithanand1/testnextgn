import express from "express"
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controllers/getcurrentUser.js";



const userRouter=express.Router();
userRouter.get("/get",isAuth,getCurrentUser);

export default userRouter