import mongoose from 'mongoose'
import customError from '../custom/customError.js'
import generateToken from '../custom/generateToken.js'
import Recruiter from "../model/recruiterModel.js"


// @desc    login Admin
// @route   POST /api/admin/login
// @access  Private
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid
        console.log('1')
        let foundAdmin = await Recruiter.findOne({ email })
        console.log('sdfsd', foundAdmin)

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
export { loginAdmin }