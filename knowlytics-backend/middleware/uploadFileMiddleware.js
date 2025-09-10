const multer = require("multer");
const path = require("path");

// Configure storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure 'uploads/' exists
  },
  filename: function (req, file, cb) {
    // Save file with unique timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with storage config
const upload = multer({ storage });

// Export middleware to accept any files
const uploadFiles = upload.any();

module.exports = uploadFiles;
