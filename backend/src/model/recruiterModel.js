import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const recruiterSchema = mongoose.Schema(
    {
        companyLogo: { type: String, required: true },
        companyName: { type: String, required: true },
        companyDescription: { type: String, required: true },
        title: { type: String, required: true },
        companySize: {
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
        companyType: {
            type: String,
            enum: ["Startup", "mnc"]
        },
        markets: [{ type: String }],
        phoneNumber: { type: Number, required: true, unique: true },
        email: { type: String, unique: true },
        password: { type: String },
        website: { type: String },
        location: { type: String },
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