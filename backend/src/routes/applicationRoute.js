import express from "express"
const router = express.Router()
import { applyApplication } from "../controllers/applicationController.js"
import { isAdmin, isCandidate, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"


router.post('/create', verifyToken, isCandidate, applyApplication)

export default router