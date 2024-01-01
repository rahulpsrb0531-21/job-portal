import customError from '../custom/customError.js'
import generateToken from '../custom/generateToken.js'
import Recruiter from '../model/recruiterModel.js'

// @desc    login Recruiter
// @route   POST /api/recruiter/login
// @access  public
const loginRecruiter = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid

        let foundRecruiter = await Recruiter.findOne({ email })

        if (foundRecruiter && (await foundRecruiter.matchPassword(password))) {
            let recruiter = await Recruiter.findOne({ email }).select('-password')
            res.status(200).json({
                success: true,
                recruiter,
                accessToken: generateToken(recruiter._id),
                message: `Logged In Successfully`
            })
        } else {
            res.status(200).json({
                success: false,
                data: "User is not registered"
            })
        }

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        })
    }
}

// @desc    Register Recruiter
// @route   POST /api/recruiter/create
// @access  public
const registerRecruiter = async (req, res) => {
    try {
        const { name, phoneNumber, email, password, website, location, industry, bio } = req.body
        if (!name || !phoneNumber || !email || !password || !website || !location
            || !industry || !bio) throw customError.dataInvalid

        const recruiterExists = await Recruiter.findOne({ phoneNumber })
        if (recruiterExists) {
            res.status(400)
            throw new Error("Recruiter already exists")
        }
        const newRecruiter = await Recruiter.create({
            name,
            phoneNumber,
            email,
            password,
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

// @desc    Update Recruiter
// @route   UPDATE /api/recruiter/update
// @access  private
const updateRecruiter = async (req, res) => {
    try {
        const { name, phoneNumber, email, password, website, location, industry, bio } = req.body
        if (!name || !phoneNumber || !email || !password || !website || !location
            || !industry || !bio) throw customError.dataInvalid

        const recruiterExists = await Recruiter.findOne({ phoneNumber })
        if (recruiterExists) {
            recruiterExists.name = name,
                recruiterExists.phoneNumber = phoneNumber,
                recruiterExists.email = email,
                recruiterExists.password = password,
                recruiterExists.website = website,
                recruiterExists.location = location,
                recruiterExists.industry = industry,
                recruiterExists.bio = bio
        }
        let recruiterUpdate = await recruiterExists.save()
        res.status(200).json({
            success: true,
            recruiter: recruiterUpdate,
            accessToken: generateToken(recruiterExists._id),
            message: `Update Recruiter Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    Delete Recruiter
// @route   DELETE /api/recruiter/delete
// @access  private
const deleteRecruiter = async (req, res) => {
    try {
        const _id = req.params.id
        console.log(_id)
        const recruiter = await Recruiter.deleteOne({ _id: _id })
        // if (recruiter) {
        // await recruiter.remove()
        res.status(200).json({
            success: true,
            message: 'Recruiter deleted successfully',
        })
        // }
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

export { registerRecruiter, loginRecruiter, updateRecruiter, deleteRecruiter }