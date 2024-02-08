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
import applicationRoute from './routes/applicationRoute.js'
import adminRoute from './routes/adminRoute.js'
import { handleResumeUpload } from './custom/uploadFile.js'
import { handleImageUpload } from './custom/uploadImage.js'
import Candidate from './model/candidateModal.js'
import { handleDocumentUpload } from './custom/uploadDoc.js'

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

    /** Routes */
    router.use('/api/candidate', candidateRoute)
    router.use('/api/application', applicationRoute)
    router.use('/api/recruiter', recruiterRoute)
    router.use('/api/job', jobRoute)
    router.use('/api/admin', adminRoute)


    router.post('/upload/resume/candidate/:id', handleResumeUpload, async (req, res) => {
        const _id = req.params.id
        const filePath = req.file.path
        try {
            const candidate = await Candidate.findOneAndUpdate(
                { _id: _id },
                { $set: { resume: filePath } },
                { new: true }
            )
            console.log("Successful")
            if (!candidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }

            res.json({ success: true, updatedCandidate: candidate });
        } catch (error) {
            console.error('Error updating resume:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    router.post('/upload-image', handleImageUpload, async (req, res) => {
        const filePath = req.file.path;
        res.json({ message: 'Uploaded successfully', filePath })
    })

    router.post('/upload/candidate/document/:id/:docName', handleDocumentUpload, async (req, res) => {
        const _id = req.params.id
        const docName = req.params.docName
        const filePath = req.file.path

        try {
            const updateFields = {};
            updateFields[docName] = filePath

            const updatedCandidate = await Candidate.findOneAndUpdate(
                { _id: _id },
                { $set: updateFields },
                { new: true }
            )
            if (!updatedCandidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }

            res.json({
                success: true,
                updatedCandidate: updatedCandidate
            });
        } catch (error) {
            console.error('Error updating resume:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

        // const filePath = req.file.path
        // try {
        //     res.json({ message: 'Uploaded successfully', filePath })
        // } catch (error) {
        //     console.error('Error updating resume:', error);
        //     res.status(500).json({ error: 'Internal Server Error' });
        // }
    })

    router.listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};