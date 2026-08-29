import express from "express"

//local import
import protect from "../middleware/authMiddleware.js"
import loanController from "../controllers/loanController.js"

const routes = express.Router()

routes.post("/add", protect.authUser, loanController.addLoan)
routes.get("/all", protect.authUser, loanController.getLoan)

export default routes