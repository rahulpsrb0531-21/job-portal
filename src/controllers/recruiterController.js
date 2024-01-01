import customError from '../custom/customError.js'
import generateToken from '../custom/generateToken.js'
import Recruiter from '../model/recruiterModel.js'

// @desc    Register Recruiter
// @route   POST /api/recruiter/create
// @access  private
const registerRecruiter = async (req, res) => {
    try {
        const { name, phoneNumber, email, passowrd, website, location, industry, bio } = req.body
        // console.log(req.body)

        const recruiterExists = await Recruiter.findOne({ phoneNumber })
        if (recruiterExists) {
            res.status(400)
            throw new Error("Recruiter already exists")
        }
        const newRecruiter = await Recruiter.create({
            name,
            phoneNumber,
            email,
            passowrd,
            website,
            location,
            industry,
            bio
        })

        res.status(200).json({
            success: true,
            accessToken: generateToken(newRecruiter._id),
            recruiter: newRecruiter,
            message: `Register in Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

export { registerRecruiter }