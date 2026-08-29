import express from "express"
import protect from "../middleware/authMiddleware.js"
import summaryController from "../controllers/summaryController.js"


const routes = express.Router()

routes.get('/monthly', protect.authUser, summaryController.getMonthlySummary)

export default routes