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
        },
        rightToWork: { type: Boolean, default: false },
        sponsorshipToWork: { type: Boolean, default: false },
        resume: { type: String, required: true },
        candidateProfileApproveRequest: { type: Boolean, default: false },
        sentApproveRequest: { type: Boolean, default: false },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'approve', 'rejected']
        }
    }
)
const Application = mongoose.model("Application", applicationSchema);
export default Application