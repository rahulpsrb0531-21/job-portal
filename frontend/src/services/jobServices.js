import { server } from '../utils/server'

// const getJobsByCompanyName = () => {
//     return server.get(`api/job/all`)
//         .then(res => {
//             // console.log(res.data);
//             return res.data
//         })
//         .catch(err => {
//             // console.log(err.response.data.details.message);
//             return null
//         })
// }

const createJob = (data) => {
    return server.post(`/api/job/create`, data)
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

const deleteJob = (data) => {
    return server.post(`api/job/delete/saved/candidate`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const jobServices = {
    createJob, getAllJobs, savedJob, deleteJob
}
export default jobServices