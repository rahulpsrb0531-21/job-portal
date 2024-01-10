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
const candidateServices = {
    createCandidate
}
export default candidateServices