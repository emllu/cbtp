const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { Children } = require('react');

const authmiddleware = (req, res, next) => {
  try {
   
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Missing authorization header" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part from "Bearer token"
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token not provided" });
    }

    const { userid, username } = jwt.verify(token, "your-secret-key"); // Replace with your actual secret key
    req.user = { userid, username }; // Store the decoded token information in the request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Error verifying token:", error.message); // Capture the specific error message
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid or expired token" });
  }
};

module.exports = authmiddleware;

