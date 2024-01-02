import express from "express"
const router = express.Router()
import { deleteRecruiter, loginRecruiter, registerRecruiter, updateRecruiter } from '../controllers/recruiterController.js'
import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.put('/update', verifyToken, isRecruiter, updateRecruiter)
router.delete('/:id', verifyToken, isAdmin, deleteRecruiter)

export default router