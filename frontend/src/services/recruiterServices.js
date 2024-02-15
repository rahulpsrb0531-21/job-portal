import { server } from '../utils/server'

const update = (data) => {
    return server.put(`api/recruiter/update`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getRecruiterById = (id) => {
    return server.get(`api/recruiter/profile/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getJobRecruiterById = (id) => {
    return server.get(`api/recruiter/get/jobs/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getApplicants = (id) => {
    return server.get(`api/recruiter/applicant/recruiter/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}


// ADMIN 
const getAllRecruiter = (id) => {
    return server.get(`api/recruiter/get/all`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const adminUpdate = (data) => {
    return server.put(`api/recruiter/admin/update`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const recruiterServices = {
    update, getJobRecruiterById, getApplicants, getAllRecruiter, adminUpdate, getRecruiterById
}
export default recruiterServices