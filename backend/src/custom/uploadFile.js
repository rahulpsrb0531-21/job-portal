import path from 'path'
import multer from 'multer'
import fs from 'fs'

// Define the path to your uploads folder
const __dirname = path.resolve()
const uploadsPath = path.join(__dirname, 'uploads');

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where the files will be saved
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
})

// Configure multer with the storage settings
const upload = multer({ storage });

// Function to handle storing the resume file
function handleResumeUpload(req, res, next) {
    upload.single('resume')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'File upload error' });
        } else if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        next()
    });
}

export { handleResumeUpload }