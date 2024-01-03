import express from "express"
const router = express.Router()
import { createJob, deleteJob, getJob, updateJob } from '../controllers/jobController.js'
import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.get('/get/:id', getJob)
router.post('/create', verifyToken, isRecruiter, createJob)
router.put('/update', verifyToken, isRecruiter, updateJob)
router.delete('/delete/:id', verifyToken, isRecruiter, deleteJob)

export default router