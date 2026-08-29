import express from "express"

//local import
import protect from "../middleware/authMiddleware.js"
import incomeController from "../controllers/incomeController.js"

const routes = express.Router()

routes.post("/add", protect.authUser, incomeController.addIncome )
routes.get("/all", protect.authUser, incomeController.getIncome )

export default routes