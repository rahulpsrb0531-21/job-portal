import express from "express"
const router = express.Router()
import { candidateDeleteEducation, candidateDeleteWorkExpr, getCandidateByid, loginCandidate, registerCandidate, updateCandidate } from "../controllers/candidateController.js"
import { isAdmin, isCandidate, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

// router.get('/get/:id', getJob)
router.post('/login', loginCandidate)
router.post('/register', registerCandidate)
router.get('/:id', getCandidateByid)
router.get('/job/saved/:candidateId', verifyToken, isCandidate, getCandidateByid)
router.put('/update/:id', verifyToken, isCandidate, updateCandidate)
router.post('/work/experience', verifyToken, isCandidate, candidateDeleteWorkExpr)
router.post('/education/graduation', verifyToken, isCandidate, candidateDeleteEducation)
// router.delete('/delete/:id', verifyToken, isRecruiter, deleteJob)

export default router