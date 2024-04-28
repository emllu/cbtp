const express = require('express');
const multer = require('multer'); // Multer for file uploads
const { StatusCodes } = require('http-status-codes');
const dbConnection = require('../dbconfig/dbconfig'); // Database connection
const fs = require('fs');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'Images/'; // Directory to store uploaded files
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the folder if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}_${file.originalname}`; // Generate a unique filename
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage }); // Initialize Multer with the storage configuration

// Middleware for handling file uploads
const uploadMiddleware = upload.single('file'); // Expecting a single file with the field name "file"

// Express app initialization
// / Middleware for parsing JSON bodies

// Route to upload a file and insert all item data into the "items" table
   async function uploadAndInsertItem (req, res)  {
  try {
    const uploadedFile = req.file; // The uploaded file
    if (!uploadedFile) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'No file uploaded' });
    }

    const { name, price, quantity } = req.body; // Data from the request body
    const filePath = `Images/${uploadedFile.filename}`; // Path to the uploaded file

    // Insert all item details including the image URL into the "items" table
    const query = 'INSERT INTO items (name, price, quantity, img_url) VALUES (?, ?, ?, ?)';
    const [result] = await dbConnection.query(query, [name, price, quantity, filePath]);

    return res.status(StatusCodes.OK).json({
      msg: 'Item and file uploaded successfully',
      item: {
        id: result.insertId, // ID of the inserted record
        name,
        price,
        quantity,
        img_url: filePath, // Path to the uploaded image
      },
    });
  } catch (error) {
    console.error('Error uploading and inserting item:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Failed to upload and insert item' });
  }
};

// Express route to handle file upload and item insertion
// .post('/api/users/upload-and-insert', uploadMiddleware, uploadAndInsertItem);

module.exports = {
    uploadAndInsertItem ,uploadMiddleware
};

