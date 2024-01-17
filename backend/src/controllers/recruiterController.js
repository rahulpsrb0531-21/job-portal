import customError from '../custom/customError.js'
import generateToken from '../custom/generateToken.js'
import Job from '../model/jobModel.js'
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
                user: recruiter,
                accessToken: generateToken(recruiter.role),
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
        const { recruiterName, email, password, role } = req.body
        if (!recruiterName || !email || !password || !role) throw customError.dataInvalid

        const recruiterExists = await Recruiter.findOne({ email })
        if (recruiterExists) {
            res.status(400)
            throw new Error("Recruiter already exists")
        }
        const newRecruiter = await Recruiter.create({
            recruiterName,
            email,
            password,
            role,
        })
        res.status(200).json({
            success: true,
            accessToken: generateToken(newRecruiter.role),
            user: newRecruiter,
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
        const { companyLogo, companyName, companyDescription, oneLinePitch,
            companySize, companyType, markets, location, phone, workEmail,
            website, twitter, linkedIn, facebook, blogUrl, recruiterName, email } = req.body

        // console.log('0')
        // if (!companyLogo || !companyName || !companyDescription || !oneLinePitch
        //     || !companySize || !companyType || !markets || !location || !phone || !workEmail
        //     || !website || !twitter || !linkedIn || !facebook || !blogUrl
        //     || !recruiterName || !email
        // ) throw customError.dataInvalid
        console.log('1')
        const recruiterExists = await Recruiter.findOne({ email })
        console.log('2')
        if (recruiterExists) {
            recruiterExists.companyLogo = companyLogo
            recruiterExists.companyName = companyName
            recruiterExists.companyDescription = companyDescription
            recruiterExists.oneLinePitch = oneLinePitch
            recruiterExists.companySize = companySize
            recruiterExists.companyType = companyType
            recruiterExists.markets = markets
            recruiterExists.location = location
            recruiterExists.phone = phone
            recruiterExists.workEmail = workEmail
            recruiterExists.website = website
            recruiterExists.twitter = twitter
            recruiterExists.linkedIn = linkedIn
            recruiterExists.facebook = facebook
            recruiterExists.blogUrl = blogUrl
        }
        console.log('3')
        let recruiterUpdate = await recruiterExists.save()
        console.log('4')
        res.status(200).json({
            success: true,
            recruiter: recruiterUpdate,
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

// @desc   Delete Recruiter
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


// @desc    Get All Jobs By Recruiter Id
// @route   Get /api/get all/job/recruiter/id
// @access  Public
const getAllJobByRecruiterId = async (req, res) => {
    try {
        const _id = req.params.id
        // console.log(_id)
        const jobs = await Job.find({ recruiterId: _id })
        res.status(200).json({
            success: true,
            data: jobs,
            message: 'Get All Jobs successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

export { registerRecruiter, loginRecruiter, updateRecruiter, deleteRecruiter, getAllJobByRecruiterId }