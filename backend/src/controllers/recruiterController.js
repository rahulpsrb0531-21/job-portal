import mongoose from 'mongoose'
import customError from '../custom/customError.js'
import generateToken from '../custom/generateToken.js'
import Job from '../model/jobModel.js'
import Recruiter from '../model/recruiterModel.js'
import Application from '../model/applicationSchema.js'

// @desc    login Recruiter
// @route   POST /api/recruiter/login
// @access  public
const loginRecruiter = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid
        console.log(email, password)
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
// @access  ADMIN
const registerRecruiter = async (req, res) => {
    try {
        const { recruiterName, email, password, role } = req.body
        if (!recruiterName || !email || !password || !role) throw customError.dataInvalid
        console.log(recruiterName, email, password, role)
        const recruiterExists = await Recruiter.findOne({ email: email })
        if (recruiterExists) throw customError.userExists
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
            message: 'Recruiter already exists',
            success: false,
        });
    }
}

// @desc    Get Recruiter By Id
// @route   GET /api/recruiter/:id
// @access  private
const getRecruiterByid = async (req, res) => {
    try {
        const _id = req.params.id
        // Find the candidate by their ID
        let recruiter = await Recruiter.findOne({ _id })

        res.status(200).json({
            success: true,
            user: recruiter,
            message: `Get Recruiter Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc   Update Recruiter
// @route   UPDATE /api/recruiter/update
// @access  private Admin
const updateRecruiter = async (req, res) => {
    try {
        const { oneLinePitch,
            companySize, companyType, markets, location, phone, workEmail,
            website, twitter, linkedIn, facebook, blogUrl, recruiterName, email } = req.body
        // console.log('1')
        const recruiterExists = await Recruiter.findOne({ email })
        // console.log('2')
        if (recruiterExists) {
            recruiterExists.recruiterName = recruiterName
            recruiterExists.email = email
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
        // console.log('3')
        let recruiterUpdate = await recruiterExists.save()
        // console.log('4')
        res.status(200).json({
            success: true,
            user: recruiterUpdate,
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
// @route   GET /api/get/jobs/:id
// @access  Public
const getAllJobByRecruiterId = async (req, res) => {
    try {
        const _id = req.params.id
        console.log(_id)
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

// @desc    Get Candidate Applied job 
// @route   GET /api/recruiter/applicant/recruiter/:id
// @access  private
const getRecruiterApplicants = async (req, res) => {
    try {
        const ObjectId = mongoose.Types.ObjectId
        const recruiterId = new ObjectId(req.params.id)
        // const candidateId = req.params.candidateId
        // console.log(candidateId)
        const applicants = await Application.find({ "job.recruiterId": recruiterId })

        res.status(200).json({
            success: true,
            applicants
        })

    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// ADMIN 

// @desc    Get All Recruiter
// @route   GET /api/get/all
// @access  Admin
const getAllRecruiter = async (req, res) => {
    try {
        let recruiters = await Recruiter.find({})
        res.status(200).json({
            success: true,
            data: recruiters,
            message: `Get All Recruiters Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}


export { registerRecruiter, loginRecruiter, getRecruiterByid, updateRecruiter, deleteRecruiter, getAllJobByRecruiterId, getRecruiterApplicants, getAllRecruiter }