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
                candidate,
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

// @desc    Update Candidate
// @route   PUT /api/candidate/update/:id
// @access  private
const updateCandidate = async (req, res) => {
    try {
        const _id = req.params.id
        const { candidateName, email, password, location, primaryRole, yearsOfExperience,
            socialMedia, workExperience, eduction, skills, achivements,
            jobsApplied, jobsSaved, role } = req.body

        // Find the candidate by their ID
        const candidate = Candidate.findById({ _id })
            .exec()
            .then(candidate => {
                if (!candidate) {
                    throw new Error('Candidate not found');
                }
                // Retrieve job details based on applied job IDs from the candidate
                return Job.find({ _id: { $in: candidate.jobsSaved } })
            })
            .then(appliedJobs => {
                const response = appliedJobs
                res.status(200).json({
                    success: true,
                    response,
                    message: `Update Candidate Successfully`,
                })

                console.log('Response:', response)
            })

    } catch (error) {
        console.log(`***** ERROR : ${req.originalUrl, error} error`);
        res.status(200).json({
            success: false,
            data: error,
        });
    }
}

export { registerCandidate, loginCandidate, updateCandidate }