import { server } from '../utils/server'

const create = (data) => {
    return server.post(`api/application/create`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const applicationServices = {
    create
}
export default applicationServices