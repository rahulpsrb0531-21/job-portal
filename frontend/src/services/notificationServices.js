import { server } from '../utils/server'

const createNotification = (data) => {
    return server.post(`/api/notification/create`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const updateNotification = (data) => {
    return server.post(`/api/notification/update`, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}

const getAllNotification = () => {
    return server.get(`api/notification/get-all`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return null
        })
}


const notificationServices = { createNotification, updateNotification, getAllNotification }

export default notificationServices