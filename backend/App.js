require('dotenv').config();
const express = require('express');
const dbconnection = require("./dbconfig/dbconfig");
const userRoute = require('./Routes/userRoutes');
const cors =require('cors');


// Creating Express application instance
const app = express();
const PORT = 5525;
app.use(cors())
// Middleware to parse JSON data from requests
app.use(express.json());

// Routes middleware for user-related endpoints
app.use('/api/users', userRoute);

// Starting the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





