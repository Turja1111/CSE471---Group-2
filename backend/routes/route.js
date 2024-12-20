import express from "express"
import {signup, login, profile, updateProfile} from "../controllers/All.js"
import { authenticateToken } from "../config/middlewares.js"

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.get("/profile",authenticateToken, profile)
router.put("/profile",authenticateToken, updateProfile)

export default router