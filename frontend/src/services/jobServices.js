import { server } from '../utils/server'

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

const jobServices = {
    getAllJobs, savedJob
}
export default jobServices