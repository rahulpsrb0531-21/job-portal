import express from "express"
const router = express.Router()
import { deleteRecruiter, getAllJobByRecruiterId, loginRecruiter, registerRecruiter, updateRecruiter } from '../controllers/recruiterController.js'
import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.get('/get/jobs/:id', getAllJobByRecruiterId)
router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.put('/update', verifyToken, isRecruiter, updateRecruiter)
router.delete('/:id', verifyToken, isAdmin, deleteRecruiter)

export default router