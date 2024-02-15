import { server } from '../utils/server'

const createJob = (data) => {
    return server.post(`/api/job/create`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const updateJob = (data) => {
    return server.post(`/api/job/update`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const searchJob = (data) => {
    return server.post(`/api/job/search`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const deleteJob = (id) => {
    return server.delete(`/api/job/delete/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getAllJobs = () => {
    return server.get(`api/job/all`)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const savedJob = (data) => {
    return server.post(`api/job/saved/candidate`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const deleteSavedJob = (data) => {
    return server.post(`api/job/delete/saved/candidate`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

// ADMIN 
const getJobs = () => {
    return server.get(`api/job/get/all`)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const adminCreateJob = (data) => {
    return server.post(`/api/job/admin/create`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const jobServices = {
    createJob, updateJob, getAllJobs, savedJob, deleteSavedJob, deleteJob, getJobs, adminCreateJob, searchJob
}
export default jobServices