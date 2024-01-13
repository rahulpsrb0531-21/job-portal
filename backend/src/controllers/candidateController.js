import mongoose from "mongoose"
import customError from "../custom/customError.js"
import generateToken from "../custom/generateToken.js"
import Candidate from "../model/candidateModal.js"
import Job from "../model/jobModel.js"


// @desc    Register Candidate
// @route   POST /api/candidate/create
// @access  public
const registerCandidate = async (req, res) => {
    try {
        console.log('req.body', req.body)
        const { candidateName, email, password, role } = req.body
        if (!candidateName || !email || !password || !role) throw customError.dataInvalid

        const candidateExists = await Candidate.findOne({ email })
        if (candidateExists) {
            res.status(400)
            throw new Error("Candidate already exists")
        }
        const newCandidate = await Candidate.create({
            candidateName,
            email,
            password,
            role
        })
        res.status(200).json({
            success: true,
            candidate: newCandidate,
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
                candidate: candidate,
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

// @desc    Update Candidate
// @route   PUT /api/candidate/update/:id
// @access  private
const updateCandidate = async (req, res) => {
    try {
        const _id = req.params.id
        const { candidateName, email, password, location, primaryRole, yearsOfExperience,
            website,
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
        console.log('2')
        let updateCandidate = await candidate.save()
        console.log('3')

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
// @desc    Update Candidate
// @route   PUT /api/candidate/update/:id
// @access  private
// const updateCandidate = async (req, res) => {
//     try {
//         const _id = req.params.id
//         const { candidateName, email, password, location, primaryRole, yearsOfExperience,
//             website,
// linkedin,
// twitter,
// gitHub, workExperience, eduction, skills, achivements,
//             jobsApplied, jobsSaved, role } = req.body

//         // Find the candidate by their ID
//         const candidate = Candidate.findById({ _id })
//             .exec()
//             .then(candidate => {
//                 if (!candidate) {
//                     throw new Error('Candidate not found');
//                 }
//                 // Retrieve job details based on applied job IDs from the candidate
//                 return Job.find({ _id: { $in: candidate.jobsSaved } })
//             })
//             .then(appliedJobs => {
//                 const response = appliedJobs
//                 res.status(200).json({
//                     success: true,
//                     response,
//                     message: `Update Candidate Successfully`,
//                 })

//                 console.log('Response:', response)
//             })

//     } catch (error) {
//         console.log(`***** ERROR : ${req.originalUrl, error} error`);
//         res.status(200).json({
//             success: false,
//             data: error,
//         });
//     }
// }

// @desc    Get Candidate saved job in jobSaved array
// @route   GET /api/Job/saved/:candidate
// @access  private
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

        // {
        //     $match: {
        //       candidateId: candidateId,
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: 'jobs', // Assuming 'jobs' is the name of your jobs collection
        //       localField: 'savedJobs.jobId',
        //       foreignField: 'jobId',
        //       as: 'jobDetails',
        //     },
        //   },
        // const d = await Candidate.findById({ _id: candidateId })
        // const d = await Candidate.aggregate([
        //     {
        //         $match: {
        //             _id: candidateId,
        //         },
        //     },
        //     {
        //         $unwind: '$jobsSaved',
        //     },
        //     // {
        //     //     $lookup: {
        //     //         from: "Job",
        //     //         let: {
        //     //             itemId: { $toObjectId: "$jobsSaved.jobsSaved" },
        //     //             items: "$jobsSaved"
        //     //         },
        //     //         pipeline: [
        //     //             { $match: { $expr: { $eq: ["$_id", "$$itemId"] } } },
        //     //             // { $replaceRoot: { newRoot: { $mergeObjects: ["$$items", "$$ROOT"] } } }
        //     //         ],
        //     //         as: "items"
        //     //     }
        //     // }
        //     {
        //         $lookup: {
        //             from: 'Job',
        //             localField: 'jobsSaved.jobsSaved',
        //             foreignField: '_id',
        //             as: 'jobDetails',
        //         },
        //     },
        //     // {
        //     //     $unwind: '$jobDetails', // Unwind the jobDetails array
        //     // },
        //     // {
        //     //     $group: {
        //     //         _id: '$_id',
        //     //         candidate: { $first: '$$ROOT' },
        //     //         jobs: { $push: '$jobDetails' },
        //     //     },
        //     // },
        //     // {
        //     //     $project: {
        //     //         _id: 0,
        //     //         candidate: 1,
        //     //         jobs: 1,
        //     //     },
        //     // },
        // ])
        // // console.log('saved ', d)

        // res.status(200).json({
        //     success: true,
        //     data: d,
        //     message: 'Job saved successfully',
        // })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}


export { registerCandidate, loginCandidate, getCandidateByid, updateCandidate }