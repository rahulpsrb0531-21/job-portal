import express from "express"
const router = express.Router()
import { loginAdmin, registerRecruiterByAdmin, updateAdminRecruiter } from "../controllers/adminController.js"
import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"
import { deleteRecruiter, updateRecruiter } from "../controllers/recruiterController.js"
import { createJob, deleteJob, updateJob } from "../controllers/jobController.js"

router.post('/login', loginAdmin)
router.post('/register/recruiter', verifyToken, isAdmin, registerRecruiterByAdmin)
// router.delete('/delete/recruiter', verifyToken, isAdmin, )
router.delete('/delete/recruiter/:id', verifyToken, isAdmin, deleteRecruiter)

//JOB
router.post('/job/create', verifyToken, isAdmin, createJob)
router.post('/update/job', verifyToken, isAdmin, updateJob)
router.delete('/delete/job/:id', verifyToken, isAdmin, deleteJob)

// RECRUITER 
router.post('/recruiter/update', verifyToken, isAdmin, updateAdminRecruiter)
export default router