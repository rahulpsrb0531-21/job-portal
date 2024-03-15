import customError from "../custom/customError.js";
import Application from "../model/applicationSchema.js";
import Candidate from "../model/candidateModal.js";
import Job from "../model/jobModel.js";
import { Types } from 'mongoose'

// @desc    Create Application For Applying Job
// @route   POST /api/application/create
// @access  public 
const applyApplication = async (req, res) => {
    try {
        const { totalYearExp, relavantWork, candidateId, jobId, sponsorshipToWork, rightToWork } = req.body
        if (
            !totalYearExp || !candidateId || !jobId) throw customError.dataInvalid

        // if job not exits throw error 
        let jobExists = await Job.findById({ _id: jobId })

        // if candidate not exits throw error 
        let candidateExists = await Candidate.findOne({ _id: candidateId })
        // console.log(candidateExists)

        const newApp = await Application.findOne({
            $and: [
                { "candidate._id": candidateExists._id },
                { "job._id": jobExists._id }
            ]
        })
        if (newApp) throw customError.applicationExists

        const newApplication = await Application.create({
            totalYearExp: totalYearExp,
            relavantWork: relavantWork,
            sponsorshipToWork: sponsorshipToWork,
            rightToWork: rightToWork,
            candidate: candidateExists,
            job: jobExists,
            name: candidateExists.candidateName,
            email: candidateExists.email,
            resume: candidateExists.resume,
            status: 'pending',
        })

        // Update the candidate document to include the application ID in the appliedJobs array
        Candidate.findByIdAndUpdate(
            { _id: candidateId },
            { $push: { jobsApplied: jobExists } },
            { new: true }
        )
            .exec()
            .then(updatedCandidate => {
                if (!updatedCandidate) {
                    throw new Error('Candidate not found');
                }
            })

        // Update the job document to include the candidate ID in the appliedJobs array
        Job.findByIdAndUpdate(
            { _id: jobId },
            { $push: { jobApplied: candidateExists._id } },
            { new: true }
        )
            .exec()
            .then(updatedJob => {
                if (!updatedJob) {
                    throw new Error('Job not found');
                }
            })

        res.status(200).json({
            success: true,
            application: newApplication,
            message: `Apply Application in Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            // data: error,
            data: error,
        });
    }
}

// @desc    Get Application By UserId
// @route   GET /api/application/:id
// @access  public
const getApplicationsByUserId = async (req, res) => {
    try {
        // const _id = req.params.id
        const _Id = new Types.ObjectId(req.params.id)
        const applications = await Application.find({ "candidate._id": _Id })
        // const applications = await Application.find({ candidate: { $elemMatch: { _id: "65ad0ba1b7bd7db89d337a50" } } })
        // console.log("applications", applications?.length)
        res.status(200).json({
            success: true,
            data: applications,
            message: 'Get Applications successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}


export { applyApplication, getApplicationsByUserId }