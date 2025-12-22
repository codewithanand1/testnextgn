import User from "../modals/user.modals.js";

export const getCurrentUser=async (req,res) => {
    try {
        const user=await User.findById(req.userId)
        console.log(req.userId)
        console.log("LLLLLLLLLL")
         if(!user)
         {
            return res.status(404).json("User not found");
         }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:"error message getCurrentuser"});
    }
}