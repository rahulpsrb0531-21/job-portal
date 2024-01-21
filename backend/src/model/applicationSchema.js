import mongoose from "mongoose"

const applicationSchema = mongoose.Schema(
    {
        // candidate: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Candidate',
        // },
        // job: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Job',
        // },
        candidate: { type: Object, required: true },
        job: { type: Object, required: true },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        resume: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'accepted', 'rejected']
        }
    }
)
const Application = mongoose.model("Application", applicationSchema);
export default Application