
import express from "express"
import { login, signup } from "../controllers/auth.controller.js";
import { addMessage, askGemini, deleteChat, getAllChats } from "../controllers/chat.controller.js";
import { getUserDetails, updateProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { optionalAuth } from "../middlewares/optionalAuth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/auth/signup",signup)
router.post("/auth/login",login)

router.post("/ask-gemini",optionalAuth,askGemini)

router.get("/get-all-chats",authMiddleware, getAllChats)
router.post("/add-message",authMiddleware, addMessage)
router.put("/delete-chat",authMiddleware,deleteChat)

router.get("/get-user-details",authMiddleware, getUserDetails)
router.put("/update-profile",authMiddleware,updateProfile)

export default router