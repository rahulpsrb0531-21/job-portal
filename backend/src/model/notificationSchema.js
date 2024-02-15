import mongoose from "mongoose"

const notificationSchema = mongoose.Schema(
    {
        candidate: { type: Object, required: true },
        job: { type: Object, required: true },
        applicationId: { type: String, required: true },
        // message: { type: String },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'approve', 'rejected']
        }
    }
)
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification