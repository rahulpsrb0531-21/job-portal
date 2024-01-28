import { server } from '../utils/server'

const createCandidate = (data) => {
    return server.post(`api/candidate/create`, data)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const getCandidateById = (id) => {
    return server.get(`api/candidate/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const getAppliedJobCandidateById = (id) => {
    return server.get(`api/candidate/applied/job/${id}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const updateCandidate = ({ data, id }) => {
    return server.put(`api/candidate/update/${id}`, data)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const deleteWokrExp = (deleteWorkData) => {
    return server.post(`api/candidate/work/experience`, deleteWorkData)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const deleteEducation = (deleteEducationData) => {
    return server.post(`api/candidate/education/graduation`, deleteEducationData)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const deleteResume = (data) => {
    return server.post(`api/candidate/delete/resume`, data)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

// ADMIN 
const getAllCandidate = (id) => {
    return server.get(`api/candidate/get/all`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const candidateServices = {
    createCandidate, updateCandidate, getCandidateById, deleteWokrExp,
    deleteEducation, getAppliedJobCandidateById, getAllCandidate, deleteResume
}
export default candidateServices