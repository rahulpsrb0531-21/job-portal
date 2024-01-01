import Job from '../model/jobModel.js'

// @desc    Create new Job post
// @route   POST /api/job/create
// @access  private
const createJob = async (req, res) => {
    try {
        console.log(req.body)
        // {} = req.body

    } catch (error) {

    }
}

export { createJob }