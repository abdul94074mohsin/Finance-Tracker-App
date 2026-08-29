import express from "express"
import budgetController from "../controllers/budgetController.js"
import protect from "../middleware/authMiddleware.js"


const routes = express.Router()

routes.post("/set",protect.authUser ,budgetController.addBudget)
routes.get("/status",protect.authUser, budgetController.checkBudgetStatus)

export default routes