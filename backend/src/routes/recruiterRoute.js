import express from "express"
const router = express.Router()
import { deleteRecruiter, getAllJobByRecruiterId, getAllRecruiter, getRecruiterApplicants, getRecruiterByid, loginRecruiter, registerRecruiter, updateRecruiter } from '../controllers/recruiterController.js'
import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.get('/get/jobs/:id', getAllJobByRecruiterId)
router.get('/applicant/recruiter/:id', verifyToken, isRecruiter, getRecruiterApplicants)
router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.get('/profile/:id', verifyToken, isRecruiter, getRecruiterByid)
router.put('/update', verifyToken, isRecruiter, updateRecruiter)
router.put('/admin/update', verifyToken, isAdmin, updateRecruiter)
router.delete('/:id', verifyToken, isAdmin, deleteRecruiter)

// ADMIN 
router.get('/get/all', getAllRecruiter)

export default router 