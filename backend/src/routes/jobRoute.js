import express from "express"
const router = express.Router()
import { candidateSaveJob, createJob, deleteCandidateSaveJob, deleteJob, getAllJob, getJob, getJobAll, searchJob, updateJob } from '../controllers/jobController.js'
import { isAdmin, isCandidate, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.get('/all', getJobAll)
router.get('/get/all', getAllJob)
router.get('/:id', getJob)
// router.get('/all/saved/:candidateId', verifyToken, isCandidate, getCandidateSaveJob)
router.post('/create', verifyToken, isRecruiter, createJob)
router.post('/admin/create', verifyToken, isAdmin, createJob)
router.post('/saved/candidate', verifyToken, isCandidate, candidateSaveJob)
router.post('/search', verifyToken, isCandidate, searchJob)
router.post('/delete/saved/candidate', verifyToken, isCandidate, deleteCandidateSaveJob)
router.post('/update', verifyToken, isRecruiter, updateJob)
router.delete('/delete/:id', verifyToken, isRecruiter, deleteJob)

// ADMIN 

export default router