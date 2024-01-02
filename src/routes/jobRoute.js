import express from "express"
const router = express.Router()
import { createJob, deleteJob, updateJob } from '../controllers/jobController.js'
import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.post('/create', verifyToken, isRecruiter, createJob)
router.post('/update', verifyToken, isRecruiter, updateJob)
router.delete('/delete/:id', verifyToken, isRecruiter, deleteJob)

export default router