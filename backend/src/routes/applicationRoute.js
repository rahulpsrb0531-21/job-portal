import express from "express"
const router = express.Router()
import { createApplication } from "../controllers/applicationController.js"
import { isAdmin, isCandidate, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"


router.post('/create', verifyToken, isCandidate, createApplication)

export default router