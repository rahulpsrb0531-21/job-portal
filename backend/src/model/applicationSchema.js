import mongoose from "mongoose"

const applicationSchema = mongoose.Schema(
    {
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
        totalYearExp: {
            type: String,
            required: true,
        },
        relavantWork: {
            type: String,
            required: true,
        },
        resume: { type: String, required: true },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'accepted', 'rejected']
        }
    }
)
const Application = mongoose.model("Application", applicationSchema);
export default Application