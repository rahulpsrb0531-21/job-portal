import express from "express"
const router = express.Router()
import { deleteRecruiter, loginRecruiter, registerRecruiter, updateRecruiter } from '../controllers/recruiterController.js'

router.post('/register', registerRecruiter)
router.post('/login', loginRecruiter)
router.put('/update', updateRecruiter)
router.delete('/:id', deleteRecruiter)

export default router