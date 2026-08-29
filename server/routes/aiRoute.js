import express from "express";


import protect from "../middleware/authMiddleware.js";
import aiController from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", protect.authUser, aiController.miniCAChatbot);
router.post("/goal-advice", protect.authUser, aiController.smartGoalAdvice);
// router.get("/response" , protect.authUser, aiController.getResponse)
export default router;
