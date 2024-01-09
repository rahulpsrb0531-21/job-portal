import path from 'path'
import multer from 'multer'
import fs from 'fs'
// Define the path to your uploads folder
const __dirname = path.resolve()
const uploadsPath = path.join(__dirname, 'uploads');

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderName = Date.now().toString(); // Create a folder using timestamp as the folder name
        const folderPath = path.join(uploadsPath, folderName);
        fs.mkdirSync(folderPath, { recursive: true }); // Create folder if it doesn't exist
        cb(null, folderPath); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        const fileName = `file_${Date.now()}${fileExtension}`;
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
            // Other errors
            return res.status(500).json({ message: 'Internal server error' });
        }
        // Proceed to the next middleware/route handler
        next()
    });
}

// // Company Logo

// // const __dirname = path.resolve()
// const uploadsCompanyLogoPath = path.join(__dirname, 'uploads/company-logo');

// // Set up Multer to handle file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Set the destination folder for uploaded files
//         cb(null, uploadsCompanyLogoPath)
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

export { handleResumeUpload }