import customError from "../custom/customError.js";
import Application from "../model/applicationSchema.js";
import Candidate from "../model/candidateModal.js";
import Job from "../model/jobModel.js";


// @desc    Create Application For Applying Job
// @route   POST /api/application/create
// @access  public 
const createApplication = async (req, res) => {
    try {
        const { candidateId, jobId, about } = req.body
        if (!candidateId || !jobId || !about) throw customError.dataInvalid

        // if job not exits throw error 
        let jobExists = await Job.findById({ _id: jobId })

        // if candidate not exits throw error 
        let candidateExists = await Candidate.findOne({ _id: candidateId })
        console.log(candidateExists)

        const newApplication = await Application.create({
            candidate: candidateExists._id,
            job: jobExists._id,
            name: candidateExists.candidateName,
            email: candidateExists.email,
            about: about,
            resume: candidateExists.resume,
            status: 'pending'
        })

        // Update the candidate document to include the application ID in the appliedJobs array
        Candidate.findByIdAndUpdate(
            { _id: candidateId },
            { $push: { jobsApplied: newApplication._id } },
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
            data: error,
        });
    }
}

export { createApplication }