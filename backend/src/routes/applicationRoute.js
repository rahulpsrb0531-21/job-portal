import express from "express"
const router = express.Router()
import { applyApplication, getApplicationsByUserId } from "../controllers/applicationController.js"
import { isAdmin, isCandidate, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"


router.post('/create', verifyToken, isCandidate, applyApplication)
router.post('/:id', verifyToken, isCandidate, getApplicationsByUserId)

export default router