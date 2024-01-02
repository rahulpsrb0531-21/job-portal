import mongoose, { Schema } from "mongoose"

const jobSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        // companyLogo: { type: String },
        // companyName: { type: String, required: true },
        website: { type: String, required: true },
        experience: { type: String, required: true },
        aboutCompany: [{ type: String, required: true }],
        jobOverview: [{ type: String }],
        qualifications: [{ type: String }],
        jobRequirements: [{ type: String, required: true }],
        jobResponsibilities: [{ type: String }],
        culture: [{ type: String, required: true }],
        // jobDescription: { type: String},
        companyType: {
            type: String,
            enum: ["Startup", "mnc"]
        },
        salaryRange: {
            type: {
                minimum: {
                    type: String,
                    required: true,
                },
                maximum: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        salaryCurrency: {
            type: {
                name: {
                    type: String,
                    required: true,
                },
                symbol: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        location: { type: String, required: true },
        // industry: [{ type: String, required: true }],
        skills: [{ type: String, required: true }],
        visaSponsorship: {
            type: Boolean,
            default: false
        },
        reLocation: {
            type: Boolean,
            default: false
        },
        employmentType: {
            type: String,
            enum: ["Full-Time", "Part-Time", "Contract"]
        },
        recruiterId: {
            type: Schema.Types.ObjectId,
            ref: "Recruiter"
        },
        // recruiterName: { type: String, required: true },
        // recruiterEmail: { type: String, required: true },
        // deadline: {
        //     type: Date,
        //     require: true,
        // },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
const Job = mongoose.model("Job", jobSchema);
export default Job