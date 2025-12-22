import express from "express";
import { Login, Logout, SignUp } from "../controllers/auth.controllers.js";


const authRouter=express.Router();

console.log("kkkk")
authRouter.post("/signup",SignUp);
authRouter.post("/login",Login);
authRouter.get("/logout",Logout);
export default authRouter

