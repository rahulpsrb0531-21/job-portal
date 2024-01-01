import express from "express"
const router = express.Router()
import { registerRecruiter } from '../controllers/recruiterController.js'

router.post('/register', registerRecruiter)

export default router