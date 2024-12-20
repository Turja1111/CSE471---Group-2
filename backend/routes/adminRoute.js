import express from "express"
import { add_companion_test_question, delete_question, get_all_questions, update_question } from "../controllers/adminController.js";
import {authenticateToken} from "../config/middlewares.js";

const adminRouter = express.Router()

adminRouter.post("/questions", authenticateToken, add_companion_test_question)
adminRouter.get("/questions", get_all_questions)
adminRouter.delete("/questions/:id", authenticateToken, delete_question)
adminRouter.put("/questions/:id", authenticateToken, update_question)

export default adminRouter