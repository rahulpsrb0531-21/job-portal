import axios from 'axios'

export const server = axios.create({
    // baseURL: 'http://212.71.239.179:5000',
    baseURL: 'http://192.168.0.103:5000/',
    // baseURL: 'http://localhost:5000/',
    responseType: 'json',
    headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // // Authorization: `Bearer ${localStorage.getItem("token")}`,
        // 'Content-Type': 'application/json',
    },
});