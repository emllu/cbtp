const express = require('express');
const jwt = require('jsonwebtoken');
const dbconnection = require('../dbconfig/dbconfig'); // Database connection setup
const router = express.Router();

 async function forms  (req, res) {
  const { cust_id } = req.body;

  // Check if cust_id is valid and exists in the database
  const query = 'SELECT * FROM cust_name WHERE cust_id = ?';
  const values = [cust_id];

  try {
    const result = await dbconnection.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Create a JWT token to authenticate the user
    const token = jwt.sign({ cust_id }, 'your_secret_key', { expiresIn: '1h' });

    // Return token to the client
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports =forms;

