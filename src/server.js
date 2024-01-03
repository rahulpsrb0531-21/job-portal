import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'
import multer from 'multer'
import cors from 'cors'
import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
import config from './config/db.js'
import Logging from './library/Logging.js'
import recruiterRoute from './routes/recruiterRoute.js'
import jobRoute from './routes/jobRoute.js'
import candidateRoute from './routes/candidateRoute.js'
import { handleResumeUpload } from './custom/uploadFile.js'

const router = express()

/** Connect to Mongo */
mongoose.set('strictQuery', false)
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));


/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next()
    })

    if (process.env.NODE_ENV === 'development') {
        router.use(morgan('dev'))
    }

    //******* HIDING EXPRESS *******\\

    // Cross Origin Resource Sharing
    router.use(cors())
    router.options('*', cors())

    //******* MIDDLEWARES *******\\
    // built-in middleware for json 
    router.use(express.json())


    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));
    router.get('/favico.ico', (req, res) => {
        res.status(404);
    })

    // // Define the path to your uploads folder
    // const __dirname = path.resolve()
    // const uploadsPath = path.join(__dirname, 'uploads');

    // // Set up Multer to handle file uploads
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         // Set the destination folder for uploaded files
    //         cb(null, uploadsPath)
    //     },
    //     filename: function (req, file, cb) {
    //         // Set the filename to be unique by appending a timestamp
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //         const fileExtension = path.extname(file.originalname);
    //         const fileName = `file_${uniqueSuffix}${fileExtension}`;
    //         cb(null, fileName)
    //     },
    // });

    // // Configure multer with the storage settings
    // const upload = multer({ storage });

    // // Function to handle storing the resume file
    // function handleResumeUpload(req, res, next) {
    //     upload.single('resume')(req, res, function (err) {
    //         if (err instanceof multer.MulterError) {
    //             return res.status(400).json({ message: 'File upload error' });
    //         } else if (err) {
    //             // Other errors
    //             return res.status(500).json({ message: 'Internal server error' });
    //         }
    //         // Proceed to the next middleware/route handler
    //         next()
    //     });
    // }

    /** Routes */
    router.use('/api/candidate', candidateRoute)
    router.use('/api/recruiter', recruiterRoute)
    router.use('/api/job', jobRoute)
    router.post('/upload', handleResumeUpload, (req, res) => {
        const filePath = req.file.path;
        res.json({ message: 'File uploaded successfully', filePath })
    })

    router.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};