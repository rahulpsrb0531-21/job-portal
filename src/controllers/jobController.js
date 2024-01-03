import Job from '../model/jobModel.js'
import Recruiter from '../model/recruiterModel.js'

// @desc    Create new Job post
// @route   POST /api/job/create
// @access  private
const createJob = async (req, res) => {
    try {
        const { title, experience, website, companyName,
            aboutCompany, jobOverview, qualifications, jobResponsibilities, jobRequirements, culture, location, reLocation, visaSponsorship, companyType, salaryRange, salaryCurrency, skills, jobDescription,
            employmentType, recruiterId, } = req.body

        let recruiterExists = await Recruiter.findOne({ _id: recruiterId })

        if (recruiterExists) {
            const newJob = Job({
                title,
                experience,
                website,
                companyName,
                aboutCompany,
                jobOverview,
                qualifications,
                jobResponsibilities,
                jobRequirements,
                culture,
                location,
                reLocation,
                visaSponsorship,
                companyType,
                salaryRange,
                salaryCurrency,
                skills,
                jobDescription,
                employmentType,
                recruiterId
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
        const { _id, title, experience, website, companyName,
            aboutCompany, jobOverview, qualifications, jobResponsibilities, jobRequirements, culture, location, reLocation, visaSponsorship, companyType, salaryRange, salaryCurrency, skills, jobDescription,
            employmentType, recruiterId, } = req.body

        let jobExist = await Job.findOne({ _id })

        if (jobExist) {
            console.log('1')
            jobExist.title = title,
                jobExist.experience = experience,
                jobExist.website = website,
                jobExist.companyName = companyName,
                jobExist.aboutCompany = aboutCompany,
                jobExist.jobOverview = jobOverview,
                jobExist.qualifications = qualifications,
                jobExist.jobResponsibilities = jobResponsibilities,
                jobExist.jobRequirements = jobRequirements,
                jobExist.culture = culture,
                jobExist.location = location,
                jobExist.reLocation = reLocation,
                jobExist.visaSponsorship = visaSponsorship,
                jobExist.companyType = companyType,
                jobExist.salaryRange = salaryRange,
                jobExist.salaryCurrency = salaryCurrency,
                jobExist.skills = skills,
                jobExist.jobDescription = jobDescription,
                jobExist.employmentType = employmentType,
                jobExist.recruiterId = recruiterId
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
// @route   DELETE /api/Job/delete
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
// @route   GET /api/Job/get/:id
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


export { createJob, updateJob, deleteJob, getJob }