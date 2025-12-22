import genToken from "../cofig/token.js";
import User from "../modals/user.modals.js";
import bcrypt from "bcryptjs";


export const SignUp=async (req,res) => {
   try {
     const {name,age,email,password}=req.body;

    console.log(name,age,email,password)
    if(!name||!age||!email||!password)
    {
        return res.status(404).json({message:"fill please all the fields"});
    }
    const hashpassword=await bcrypt.hash(password,10)
    const newuser=await User.create({
        name,age,email,password:hashpassword
    })




    const token=await genToken(newuser._id)
    res.cookie("token",token,{
      httpOnly:true,
      sameSite:"strict",
      maxAge:60*60*1000
    })
    return res.status(201).json(newuser)
   } catch (error) {
    console.log(error.message);
   return res.status(500).json({message:"Inavalid error"});
   }
}


export const Login=async (req,res) => {
   try {
     const {email,password}=req.body;
    

    if(!email||!password)
    {
        return res.status(404).json({message:"Please fill all fields"})
    }

    const user=await User.findOne({email});
    if(!user)
    {
        return res.status(404).json({message:"User is not avlaible"})
    }
    const ismatch=await bcrypt.compare(password,user.password);
    if(!ismatch)
    {
        return res.status(404).json({message:"password is not match"})
    }

  const token=await genToken(user._id)
    res.cookie("token",token,{
      httpOnly:true,
      sameSite:"strict",
      maxAge:60*60*1000
    })


   return  res.status(200).json({message:"user login successfuly"});
   } catch (error) {
    console.log(error.message)
    return res.status(500).json({message:"Invalid error"})
   }
}


export const Logout=async (req,res) => {
    try {
          res.clearCookie("token");
          console.log("Logout")
          return res.status(200).json({message:"Logout"})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:"error Logout"})  
    }
}