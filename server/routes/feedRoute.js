import express from "express"
import protect from "../middleware/authMiddleware.js"
import feedController from "../controllers/feedController.js"


const routes = express.Router()

routes.get("/personal", protect.authUser, feedController.personalizedFeed)

export default routes