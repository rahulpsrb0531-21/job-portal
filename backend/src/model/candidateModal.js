import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

// Define the schema for social media links
const socialMediaSchema = mongoose.Schema({
    platform: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
})

// Define the schema for work experience
const workExperienceSchema = mongoose.Schema({
    company: {
        type: String,
    },
    title: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    currentWorkHere: { type: Boolean },
    description: { type: String }
})

// Define the schema for eduction
const eductionSchema = mongoose.Schema({
    education: {
        type: String,
    },
    graduation: {
        type: String,
    },
    degreeAndMajor: {
        type: String,
    },
    gpa: {
        type: String,
    },
    gpaMax: {
        type: String,
    },
})

export function validateEmail(email) {
    const emailRegex = /^[\w-\.]+@(gmail|yahoo|hotmail)\.(com|net|org)$/i;
    return emailRegex.test(email);
}

const conditateSchema = mongoose.Schema(
    {
        candidateImage: { type: String },
        candidateName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validateEmail,
                message: 'Please enter a valid Gmail, Yahoo, or Hotmail email address',
            },
        },
        password: { type: String },
        location: { type: String },

        // DOCUMENTS 
        resume: { type: String },
        coverLetter: { type: String },
        academicCertificates: { type: String },
        professionalCertificates: { type: String },
        proofOfIdentity: { type: String },
        proofOfAddress: { type: String },
        workPermits: { type: String },
        righttoWorkDocumentation: { type: String },
        drivingLicense: { type: String },
        dbs: { type: String },
        healthDeclaration: { type: String },
        offerLetter: { type: String },

        // like backend, frontend and fullstack developer etc... 
        primaryRole: { type: String },
        yearsOfExperience: { type: String },
        bio: { type: String },
        website: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        gitHub: { type: String },
        // socialMedia: [socialMediaSchema],
        workExperience: [workExperienceSchema],
        eduction: [eductionSchema],
        skills: [],
        achivements: { type: String },
        jobsApplied: [{ type: Object }],
        jobsSaved: [{}],
        role: { type: String, default: "CANDIDATE" },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

conditateSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// `pre` method with value `save` will run the code before saving
conditateSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    // Salt is request to hash the password asynchronously
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Candidate = mongoose.model("Candidate", conditateSchema)
export default Candidate