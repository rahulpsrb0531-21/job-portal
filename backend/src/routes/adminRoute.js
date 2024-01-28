import express from "express"
const router = express.Router()
import { loginAdmin } from "../controllers/adminController.js"
import { isAdmin, isRecruiter, verifyToken } from "../middleware/verifyJWT.js"

router.post('/login', loginAdmin)

export default router