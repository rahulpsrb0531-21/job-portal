import path from 'path'
import multer from 'multer'
import fs from 'fs'
// Define the path to your uploads folder
const __dirname = path.resolve()
const uploadsPath = path.join(__dirname, 'uploads')

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the destination folder for uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const uploadImage = multer({ storage: storage });
export { uploadImage }