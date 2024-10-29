// helper/multer.js
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Define the directory where avatars will be saved
const uploadDir = path.join(__dirname, '../public/user/upload')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }) // Create directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir) // Set the destination for avatar images
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`) // Generate a unique filename
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

// Set up multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit size to 2MB
  fileFilter: fileFilter
})

module.exports = upload