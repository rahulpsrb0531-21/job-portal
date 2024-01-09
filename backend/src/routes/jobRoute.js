import express from "express"
const router = express.Router()
import { candidateSaveJob, createJob, deleteJob, getJob, updateJob } from '../controllers/jobController.js'
import { isAdmin, isCandidate, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.get('/get/:id', getJob)
router.post('/create', verifyToken, isRecruiter, createJob)
router.post('/saved/candidate', verifyToken, isCandidate, candidateSaveJob)
router.put('/update', verifyToken, isRecruiter, updateJob)
router.delete('/delete/:id', verifyToken, isRecruiter, deleteJob)

export default router