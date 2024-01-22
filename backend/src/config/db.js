import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

// const MONGO_URL = "mongodb://127.0.0.1:27017/jobPortal"

// mongo atlas link database 
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ac-ak3qaqc-shard-00-00.ckwdxwh.mongodb.net:27017,ac-ak3qaqc-shard-00-01.ckwdxwh.mongodb.net:27017,ac-ak3qaqc-shard-00-02.ckwdxwh.mongodb.net:27017/?ssl=true&replicaSet=atlas-11gxb1-shard-0&authSource=admin&retryWrites=true&w=majority`


const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}
export default config