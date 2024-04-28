const express = require('express');
const multer = require('multer'); // Multer for file uploads
const path = require('path'); // For handling file paths
const { StatusCodes } = require('http-status-codes');
const dbconnection = require('../dbconfig/dbconfig'); // Database connection
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


// Route for file uploading and storing information in SQL database
async function uploadfile (req, res) {
  try {
    const uploadedFile = req.file; // Uploaded file object

    if (!uploadedFile) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'No file uploaded' });
    }

    // Insert file information into the "items" table
    const { originalname, filename } = uploadedFile; // Get original filename and the unique filename
    const filePath = `Images/${filename}`; // Path to the file in the server

    const query = 'INSERT INTO items ( img_url) VALUES ( ?)'; // Insert into "img_url"
    const [result] = await dbconnection.query(query, [ filePath]);

    return res.status(StatusCodes.OK).json({
      msg: 'File uploaded and stored in the database',
      item: {
        id: result.insertId, // The ID of the inserted record
        // filename: originalname,
        img_url: filePath,
      },
    });
  } catch (error) {
    console.error('Error uploading and storing file:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Failed to upload and store file' });
  }
};

module.exports = {uploadfile,upload};

