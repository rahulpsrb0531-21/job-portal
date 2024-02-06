
import { server } from '../utils/server'

//RECRUITER 
const registerRecruiterByAdmin = (data) => {
    return server.post(`api/admin/register/recruiter`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const updateRecruiter = (data) => {
    return server.post(`api/admin/recruiter/update`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const deleteRecriter = (id) => {
    return server.delete(`api/admin/delete/recruiter/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const createJob = (data) => {
    return server.post(`api/admin/job/create`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const updateJob = (data) => {
    return server.post(`api/admin/update/job`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const deleteJob = (id) => {
    return server.delete(`api/admin/delete/job/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const adminServices = {
    registerRecruiterByAdmin, updateRecruiter, deleteRecriter, createJob, updateJob, deleteJob
}
export default adminServices