import mongoose from 'mongoose'
import customError from '../custom/customError.js'
import generateToken from '../custom/generateToken.js'
import Recruiter from "../model/recruiterModel.js"
import Job from '../model/jobModel.js'


// @desc    login Admin
// @route   POST /api/admin/login
// @access  Private
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid
        console.log('1')
        let foundAdmin = await Recruiter.findOne({ email })
        // console.log('sdfsd', foundAdmin)

        if (foundAdmin && foundAdmin.role === "ADMIN" && (await foundAdmin.matchPassword(password))) {
            let admin = await Recruiter.findOne({ email }).select('-password')
            res.status(200).json({
                success: true,
                user: admin,
                accessToken: generateToken(admin.role),
                message: `Logged In Successfully`
            })
        } else {
            res.status(200).json({
                success: false,
                data: "Admin is not registered"
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

// @desc    Register Recruiter by Admin
// @route   POST /api/admin/recruiter/create
// @access  public
const registerRecruiterByAdmin = async (req, res) => {
    try {
        const { companyLogo, companyName, companyDescription, oneLinePitch, companySize, companyType,
            markets, location, recruiterName, password, email, phone, role,
            workEmail, website, twitter, linkedIn, facebook, blogUrl } = req.body

        // if (!recruiterName || !email || !password || !role) throw customError.dataInvalid
        // console.log(recruiterName, email, password, role)
        const recruiterExists = await Recruiter.findOne({ email: email })
        if (recruiterExists) throw customError.userExists
        const newRecruiter = await Recruiter.create({
            companyLogo,
            companyName,
            companyDescription,
            oneLinePitch,
            companySize,
            companyType,
            markets,
            location,
            recruiterName,
            password,
            email,
            phone,
            role,
            workEmail,
            website,
            twitter,
            linkedIn,
            facebook,
            blogUrl
        })

        res.status(200).json({
            success: true,
            // accessToken: generateToken(newRecruiter.role),
            // user: newRecruiter,
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

export { loginAdmin, registerRecruiterByAdmin }