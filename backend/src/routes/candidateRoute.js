import express from "express"
const router = express.Router()
import { loginCandidate, registerCandidate, updateCandidate } from "../controllers/candidateController.js"
// import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

// router.get('/get/:id', getJob)
router.post('/login', loginCandidate)
router.post('/register', registerCandidate)
router.put('/update/:id', updateCandidate)
// router.delete('/delete/:id', verifyToken, isRecruiter, deleteJob)

export default router