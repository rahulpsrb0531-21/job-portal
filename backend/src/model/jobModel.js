import mongoose, { Schema } from "mongoose"

const jobSchema = mongoose.Schema(
    {
        // companyLogo: { type: String },
        // companyName: { type: String, required: true },
        // companyDescription: { type: String, required: true },
        // website: { type: String, required: true },
        // aboutCompany: [{ type: String, required: true }],
        title: { type: String, required: true },
        company: { type: Object, required: true },
        experience: { type: String, required: true },
        jobOverview: [{ type: String }],
        qualifications: [{ type: String }],
        jobRequirements: [{ type: String, required: true }],
        jobResponsibilities: [{ type: String }],
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
        // salaryCurrency: { type: String, required: true },
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
        location: [{ type: String, required: true }],
        skills: [{ type: String, required: true }],
        employmentType: {
            type: String,
            enum: ["Full-Time", "Part-Time", "Permanent", "Temporary", "Contract"]
        },
        visaSponsorship: {
            type: Boolean,
            default: false
        },
        reLocation: {
            type: Boolean,
            default: false
        },
        isPremiumMember: { type: Boolean, required: false },
        recruiterId: {
            type: Schema.Types.ObjectId,
            ref: "Recruiter"
        },
        // jobSaved: [],
        jobSaved: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Candidate'
            }
        ],
        jobApplied: [{ type: Object }]
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