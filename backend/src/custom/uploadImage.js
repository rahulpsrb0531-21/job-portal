import path from 'path'
import multer from 'multer'
import fs from 'fs'
// Define the path to your uploads folder
const __dirname = path.resolve()
const uploadsPath = path.join(__dirname, 'uploads')

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

// const uploadImage = multer({ storage: storage });
// export { uploadImage }

const upload = multer({ storage });

// Function to handle storing the resume file
function handleImageUpload(req, res, next) {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Image upload error' });
        } else if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        next()
    });
}
export { handleImageUpload }