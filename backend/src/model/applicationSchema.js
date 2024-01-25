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
        resume: { type: String, required: true },
        coverLetter: { type: String, required: true },
        academicCertificates: { type: String, required: true },
        professionalCertificates: { type: String, required: true },
        proofOfIdentity: { type: String, required: true },
        proofOfAddress: { type: String, required: true },
        workPermits: { type: String, required: true },
        righttoWorkDocumentation: { type: String, required: true },
        drivingLicense: { type: String, required: true },
        dbs: { type: String, required: true },
        healthDeclaration: { type: String, required: true },
        offerLetter: { type: String, required: true },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'accepted', 'rejected']
        }
    }
)
const Application = mongoose.model("Application", applicationSchema);
export default Application