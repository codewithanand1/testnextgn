import jwt from "jsonwebtoken";


const isAuth=async (req,res,next) => {
    try {
        const token=req.cookies?.token;
        console.log(token);
        if(!token)
        {
            return res.status(401).json({message:"token is not available"});
        }
        const verify=jwt.verify(token,"password123")
        req.userId=verify.userId;
        next()
    } catch (error) {
       console.log(error.message);
       return res.status(500).json({message:"Verify user error"}) ;
    }
}

export default isAuth