import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authUser = async(req,res,next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(" ")[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id).select("-password")

            req.user = user
            next()
        }else{  
            res.status(400)
            throw new Error("Unauthorized Access: Valid token needed")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Unauthorized Access : Valid token needed")
    }
}

const protect = { authUser }

export default protect