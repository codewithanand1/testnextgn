import jwt from "jsonwebtoken"


const genToken=async (userId) => {
    try {
        const token=jwt.sign({userId},"password123",{expiresIn:"1h"})
        return token
    } catch (error) {
        console.log(error)
    }
}

export default genToken