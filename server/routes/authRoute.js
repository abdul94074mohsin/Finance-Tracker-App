import express from "express"
import authController from "../controllers/authController.js"

const route = express.Router()

const  { registerUser, loginUser} = authController

route.post('/register', registerUser)
route.post('/login', loginUser)

export default route