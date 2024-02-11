import mongoose from "mongoose"
import customError from "../custom/customError.js"
import generateToken from "../custom/generateToken.js"
import Candidate from "../model/candidateModal.js"
import Job from "../model/jobModel.js"
import Application from "../model/applicationSchema.js"


// @desc    Register Candidate
// @route   POST /api/candidate/create
// @access  public
const registerCandidate = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const { candidateName, email, password, role } = req.body
        if (!candidateName || !email || !password || !role) throw customError.dataInvalid
        const candidateExists = await Candidate.findOne({ email })
        if (candidateExists) throw customError.userExists
        const newCandidate = await Candidate.create({
            candidateName,
            email,
            password,
            role,
            resume: ""
        })
        res.status(200).json({
            success: true,
            user: newCandidate,
            accessToken: generateToken(newCandidate.role),
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

// @desc    login Candidate
// @route   POST /api/candidate/login
// @access  public
const loginCandidate = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw customError.dataInvalid

        let foundCandidate = await Candidate.findOne({ email })

        if (foundCandidate && (await foundCandidate.matchPassword(password))) {
            let candidate = await Candidate.findOne({ email }).select('-password')
            res.status(200).json({
                success: true,
                user: candidate,
                accessToken: generateToken(candidate.role),
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

// @desc    Get Candidate By Id
// @route   GET /api/candidate/:id
// @access  public
const getCandidateByid = async (req, res) => {
    try {
        const _id = req.params.id
        // Find the candidate by their ID
        let candidate = await Candidate.findOne({ _id })

        res.status(200).json({
            success: true,
            candidate: candidate,
            message: `Get Candidate Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    Get Resume Candidate By Id
// @route   GET /api/candidate/upload/resume/:id
// @access  private
const getResumeCandidateById = async (req, res) => {
    try {
        const _id = req.params.id
        const uploadName = req.params.uploadName
        // Find the candidate by their ID
        let candidate = await Candidate.findOne({ _id })

        // Send the resume file as a download
        res.download(candidate[uploadName], `document.pdf`)

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    Update Candidate
// @route   PUT /api/candidate/update/:id
// @access  private
const updateCandidate = async (req, res) => {
    try {
        const _id = req.params.id
        const { candidateName, email, password, location, primaryRole, yearsOfExperience,
            website, bio,
            linkedin,
            twitter,
            gitHub, workExperience, eduction, skills, achivements,
            jobsApplied, jobsSaved, role } = req.body

        // Find the candidate by their ID
        let candidate = await Candidate.findOne({ _id })

        if (candidate) {
            candidate.candidateName = candidateName,
                candidate.email = candidate?.email,
                candidate.password = candidate?.password,
                candidate.location = location,
                candidate.primaryRole = primaryRole,
                candidate.bio = bio,
                candidate.yearsOfExperience = yearsOfExperience,
                candidate.website = website,
                candidate.linkedin = linkedin,
                candidate.twitter = twitter,
                candidate.gitHub = gitHub,
                candidate.workExperience = workExperience,
                candidate.eduction = eduction,
                candidate.skills = skills,
                candidate.achivements = achivements
        }
        // console.log('2')
        let updateCandidate = await candidate.save()
        // console.log('3')

        res.status(200).json({
            success: true,
            candidate: updateCandidate,
            message: `Update Candidate Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}


const getCandidateSaveJob = async (req, res) => {
    try {
        const ObjectId = mongoose.Types.ObjectId
        const candidateId = new ObjectId(req.params.candidateId)

        const job = await Job.aggregate([
            {
                $match: {
                    candidateId: candidateId,
                },
            },
            {
                $group: {
                    _id: "$companyName",
                    jobs: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    companyName: "$_id",
                    companyDescription: { $first: "$jobs.companyDescription" },
                    jobs: 1
                }
            }
        ])
        res.status(200).json({
            success: true,
            job,
            message: 'Get All Job  successfully',
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
// @route   GET /api/candidate/applied/job/:candidateId
// @access  private
const getCandidateAppliedJob = async (req, res) => {
    try {
        const ObjectId = mongoose.Types.ObjectId
        const candidateId = new ObjectId(req.params.candidateId)
        // const candidateId = req.params.candidateId
        // console.log(candidateId)
        const appliedJobs = await Application.find({ "candidate._id": candidateId })

        res.status(200).json({
            success: true,
            appliedJobs
        })

    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Delete Candidate saved experience in workExperience  array
// @route   FindAndUpdate /api/candidate/work/experience
// @access  private
const candidateDeleteWorkExpr = async (req, res) => {
    try {
        const { candidateId, workId } = req.body
        // const { candidateId, workId } = req.body
        // console.log(req.body)
        // console.log(candidateId, workId)

        Candidate.findByIdAndUpdate(
            { _id: candidateId },
            { $pull: { workExperience: { "_id": workId } } }
            ,
            { new: true }
        )
            .exec()
            .then(updatedCandidate => {
                if (!updatedCandidate) {
                    throw new Error('Candidate not found');
                }
            })

        res.status(200).json({
            success: true,
            message: 'Delete Work Expericence successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error?.message
        })
    }
}

// @desc    Delete Candidate saved Graduation in education array
// @route   FindAndUpdate /api/candidate/education/graduation
// @access  private
const candidateDeleteEducation = async (req, res) => {
    try {
        const { candidateId, educationId } = req.body

        Candidate.findByIdAndUpdate(
            { _id: candidateId },
            { $pull: { eduction: { "_id": educationId } } },
            { new: true }
        )
            .exec()
            .then(updatedCandidate => {
                if (!updatedCandidate) {
                    throw new Error('Candidate not found');
                }
            })

        res.status(200).json({
            success: true,
            message: 'Delete Work Expericence successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error?.message
        })
    }
}


// @desc    Delete Candidate Resume
// @route   POST /api/candidate/delete/resume
// @access  private
const candidateDeleteResume = async (req, res) => {
    try {
        console.log(req.body)
        const { candidateId, docName } = req.body
        // const updatedCandidate = await Candidate.findByIdAndUpdate({ _id: candidateId }, { $set: { resume: '' } }, { new: true });

        const updateFields = {}
        updateFields[docName] = ""

        const updatedCandidate = await Candidate.findOneAndUpdate(
            { _id: candidateId },
            { $set: updateFields },
            { new: true }
        )

        if (!updatedCandidate) {
            return res.status(404).json({ error: 'Candidate not found.' });
        }

        // res.json({ message: 'Candidate updated successfully.', updatedCandidate })
        res.status(200).json({
            success: true,
            updatedCandidate,
            message: 'Candidate updated successfully.'
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            message: error?.message
        })
    }
}

// ADMIN 

// @desc    Get All Candidate
// @route   GET /api/candidate/get/all
// @access  Admin
const getAllCandidate = async (req, res) => {
    try {
        let candidates = await Candidate.find({})
        res.status(200).json({
            success: true,
            data: candidates,
            message: `Get All Candidate Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}



export {
    registerCandidate, loginCandidate, getCandidateByid, updateCandidate, candidateDeleteWorkExpr,
    candidateDeleteEducation, getCandidateAppliedJob, getResumeCandidateById,
    getAllCandidate, candidateDeleteResume
}