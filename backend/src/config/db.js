import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''

const MONGO_URL = "mongodb://127.0.0.1:27017/jobPortal"


// const MONGO_URL = `mongodb://srdeveloper:Welcome%402023@ac-cbullkl-shard-00-00.mveo43d.mongodb.net:27017,ac-cbullkl-shard-00-01.mveo43d.mongodb.net:27017,ac-cbullkl-shard-00-02.mveo43d.mongodb.net:27017/?ssl=true&replicaSet=atlas-fioikx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=dkrin`




const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}
export default config