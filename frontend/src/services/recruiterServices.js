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

const recruiterServices = {
    update
}
export default recruiterServices