import mongoose, { Schema } from "mongoose"

const jobSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        companyLogo: { type: String },
        companyName: { type: String, required: true },
        aboutCompany: [{ type: String, required: true }],
        companyType: {
            type: String,
            enum: ["Startup", "mnc"]
        },
        salaryRange: {
            minimum: Number,
            maximum: Number
        },
        salaryCurrency: {
            name: String,
            symbol: String
        },
        location: { type: String, required: true },
        industry: [{ type: String, required: true }],
        skills: [{ type: String, required: true }],
        visaSponsorship: {
            type: Boolean,
            default: false
        },
        reLocate: {
            type: Boolean,
            default: false
        },
        jobRequirements: [{ type: String, required: true }],
        jobDescription: { type: String, required: true },
        employmentType: {
            type: String,
            enum: ["Full-Time", "Part-Time", "Contract"]
        },
        recruiterId: {
            type: Schema.Types.ObjectId,
            ref: "Recruiter"
        },
        recruiterName: { type: String, required: true },
        recruiterEmail: { type: String, required: true },
        deadline: {
            type: Date,
            require: true,
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
const Job = mongoose.model("Job", jobSchema);
export default Job