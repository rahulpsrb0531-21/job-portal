import mongoose from 'mongoose'
import customError from '../custom/customError.js'
import Candidate from '../model/candidateModal.js'
import Recruiter from '../model/recruiterModel.js'
import Job from '../model/jobModel.js'

// @desc    Create new Job post
// @route   POST /api/job/create
// @access  private
const createJob = async (req, res) => {
    try {
        const { company, recruiterId, title, experience, jobOverview,
            qualifications, jobRequirements, jobResponsibilities, salaryRange, salaryCurrency,
            location,
            skills,
            employmentType,
            visaSponsorship,
            reLocation } = req.body

        let recruiterExists = await Recruiter.findOne({ _id: recruiterId })

        if (recruiterExists) {
            const newJob = Job({
                company: recruiterExists,
                recruiterId,
                title,
                experience,
                jobOverview,
                qualifications,
                jobRequirements,
                jobResponsibilities,
                salaryRange,
                salaryCurrency,
                location, skills,
                employmentType,
                visaSponsorship,
                reLocation
            })

            const createJob = await newJob.save()

            res.status(200).json({
                success: true,
                data: createJob,
                message: 'Created Job successfully',
            })
        } else {
            res.status(400)
            throw new Error("Recruiter not exists")
        }

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    Update Job post
// @route   POST /api/job/update
// @access  private
const updateJob = async (req, res) => {
    try {
        const { id, company, recruiterId, title, experience, jobOverview,
            qualifications, jobRequirements, jobResponsibilities, salaryRange, salaryCurrency,
            location,
            skills,
            employmentType,
            visaSponsorship,
            reLocation } = req.body
        // console.log('')

        let jobExist = await Job.findOne({ _id: id })

        if (jobExist) {
            // console.log('1')
            jobExist.company = company,
                jobExist.recruiterId = recruiterId,
                jobExist.title = title,
                jobExist.experience = experience,
                jobExist.jobOverview = jobOverview,
                jobExist.qualifications = qualifications,
                jobExist.jobRequirements = jobRequirements,
                jobExist.jobResponsibilities = jobResponsibilities,
                jobExist.salaryRange = salaryRange,
                jobExist.salaryCurrency = salaryCurrency,
                jobExist.location = location,
                jobExist.skills = skills,
                jobExist.employmentType = employmentType,
                jobExist.visaSponsorship = visaSponsorship,
                jobExist.reLocation = reLocation
        }
        console.log('2')
        let updateJob = await jobExist.save()
        console.log('3')

        res.status(200).json({
            success: true,
            job: updateJob,
            message: `Update Job Successfully`,
        })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

// @desc    Delete Job
// @route   DELETE /api/Job/delete/:id
// @access  private
const deleteJob = async (req, res) => {
    try {
        const _id = req.params.id
        const job = await Job.deleteOne({ _id: _id })
        res.status(200).json({
            success: true,
            message: 'Job deleted successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Get Job By Id
// @route   GET /api/Job/:id
// @access  public
const getJob = async (req, res) => {
    try {
        const _id = req.params.id
        const job = await Job.findById({ _id: _id })
        res.status(200).json({
            success: true,
            data: job,
            message: 'Job data successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Get Job All
// @route   GET /api/Job/all
// @access  public
const getJobAll = async (req, res) => {
    try {

        // const jobs = await Job.find({})
        // const jobs = await Job.find().sort({ {isPremiumMember}: -1, created_at: -1 })
        const jobs = await Job.find().sort({ "company.isPremiumMember": -1, created_at: -1 })
        // const jobs = await Job.find({ isPremiumMember: true }).sort({ createdAt: 1 })
        // const jobs = await Job.find({ isPremiumMember: true }).sort({ created_at: -1 })
        res.status(200).json({
            success: true,
            jobs,
            message: 'Get All Job  successfully',
        })
        console.log('jobs', jobs)

    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Post Candidate saved job in jobSaved array
// @route   FindAndUpdate /api/Job/saved/candidate
// @access  private
const candidateSaveJob = async (req, res) => {
    try {
        const { candidateId, job } = req.body
        // var jobIdToFind = ObjectId("jobIdToFind")
        const ObjectId = mongoose.Types.ObjectId
        const jobId = job?._id
        console.log(jobId)

        const jobExits = await Candidate.findOne(
            {
                _id: candidateId,
                "jobsSaved._id": jobId
            })
        if (jobExits) throw customError.jobAlreadyExists

        Candidate.findByIdAndUpdate(
            { _id: candidateId },
            { $push: { jobsSaved: job } },
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
            message: 'Job saved successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status(200).json({
            success: false,
            data: error,
        })
    }
}

// @desc    Get Candidate saved job in jobSaved array
// @route   DELETE /api/Job/saved/:candidate
// @access  private
const deleteCandidateSaveJob = async (req, res) => {
    try {
        const { candidateId, job } = req.body
        console.log(job)

        Candidate.findByIdAndUpdate(
            { _id: candidateId },
            { $pull: { jobsSaved: job } },
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
            message: 'Job Delete successfully',
        })
    } catch (error) {
        console.log(`***** ERROR: ${req.originalUrl, error} error`)
        res.status({
            success: false,
            data: error
        })
    }
}

// @desc    Filter All Jobs
// @route   POST /api/Job/search
// @access  private
const searchJob = async (req, res) => {
    try {
        const { designations, locations, experience, jobType } = req.body
        const query = {};

        if (designations && designations.length > 0) {
            // query.title = { $in: designations }
            query.title = { $regex: new RegExp(`^${designations}$`, 'i') }
        }

        if (locations && locations.length > 0) {
            query.location = { $regex: new RegExp(`^${locations}$`, 'i') }
        }

        if (experience) {
            query.experience = { $in: experience };
        }

        if (jobType && jobType.length > 0) {
            query.employmentType = { $regex: new RegExp(`^${jobType}$`, 'i') }
        }

        // Execute the query
        const jobs = await Job.find(query)

        // console.log('jobs', jobs)

        // Send back the search results
        res.status(200).json({
            success: true,
            jobs,
            message: 'Filter Jobs  successfully',
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
// @desc    Get Job All
// @route   GET /api/Job/get/all
// @access  Admin
const getAllJob = async (req, res) => {
    try {
        const job = await Job.find({})
        res.status(200).json({
            success: true,
            data: job,
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

export { createJob, updateJob, deleteJob, getJob, getJobAll, candidateSaveJob, deleteCandidateSaveJob, getAllJob, searchJob }