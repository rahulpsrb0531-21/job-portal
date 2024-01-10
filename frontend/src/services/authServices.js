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
const authServices = {
    login, register
}
export default authServices