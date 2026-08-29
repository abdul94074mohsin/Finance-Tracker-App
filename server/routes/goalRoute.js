import express from "express"

//local import
import protect from "../middleware/authMiddleware.js"
import goalController from "../controllers/goalController.js"


const routes = express.Router()

routes.post('/add',protect.authUser, goalController.addGoal)
routes.get('/all',protect.authUser, goalController.getGoals)
routes.put('/save/:id',protect.authUser, goalController.updateGoalSaving)

export default routes