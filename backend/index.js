import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.route.js";
import dbconnect from "./cofig/db.js";
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import taskRoute from "./routes/tasksRoute.route.js";
const app=express();

const PORT=8000;


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.use("/api/task",taskRoute)

app.listen(PORT,()=>{
    dbconnect();
    console.log("server is runing "+PORT)
})