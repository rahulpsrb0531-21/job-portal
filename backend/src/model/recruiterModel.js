import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const recruiterSchema = mongoose.Schema(
    {
        companyLogo: { type: String },
        companyName: { type: String },
        companyDescription: { type: String },
        oneLinePitch: { type: String },
        companySize: { type: String },
        // companySize: {
        //     type: {
        //         minimum: {
        //             type: String,
        //         },
        //         maximum: {
        //             type: String,
        //         },
        //     }
        // },
        companyType: {
            type: String,
            enum: ["Startup", "mnc"]
        },
        markets: [{ type: String }],
        location: [{ type: String }],
        phone: { type: Number, unique: true },
        recruiterName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        workEmail: { type: String, unique: true },
        password: { type: String, required: true },
        website: { type: String },
        twitter: { type: String },
        linkedIn: { type: String },
        facebook: { type: String },
        blogUrl: { type: String },
        role: { type: String, default: "RECRUITER" },
        // bio: { type: String }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

recruiterSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// `pre` method with value `save` will run the code before saving
recruiterSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    // Salt is request to hash the password asynchronously
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Recruiter = mongoose.model("Recruiter", recruiterSchema)
export default Recruiter