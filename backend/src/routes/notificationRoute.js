import express from "express"
const router = express.Router()
import { createNotification, getNotificationAll, updateNotification } from "../controllers/notificationController.js"

router.get('/get-all', getNotificationAll)
router.post('/create', createNotification)
router.post('/update', updateNotification)

export default router