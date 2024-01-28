import { server } from '../utils/server'

const login = (data) => {
    return server.post(`api/candidate/login`, data)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const register = (data) => {
    return server.post(`api/candidate/register`, data)
        .then(res => {
            // console.log(res.data);
            return res.data
        })
        .catch(err => {
            // console.log(err.response.data.details.message);
            return null
        })
}

const recruiterRegister = (data) => {
    return server.post(`api/recruiter/register`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const recruiterLogin = (data) => {
    return server.post(`api/recruiter/login`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}


const adminLogin = (data) => {
    return server.post(`api/admin/login`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}



const authServices = {
    login, register, recruiterRegister, recruiterLogin, adminLogin
}
export default authServices