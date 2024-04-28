const express = require('express');
const router = express.Router();
const dbConnection = require('../dbconfig/dbconfig'); // Database connection setup

// Endpoint to retrieve user data by cust_id
const userinfo = async (req, res) => {
  const { cust_id } = req.body;

  console.log("Received cust_id:", cust_id); // Debugging: check if cust_id is being sent

  if (!cust_id) {
    return res.status(400).json({ error: 'cust_id is required' });
  }

  try {
    // Fetch user info from different tables based on cust_id
    const [custInfo] = await dbConnection.query('SELECT * FROM cust_infos WHERE cust_id = ?', [cust_id]);
    const [custAddress] = await dbConnection.query('SELECT * FROM cust_address WHERE cust_id = ?', [cust_id]);
    const [custPhone] = await dbConnection.query('SELECT * FROM cust_phone WHERE cust_id = ?', [cust_id]);
    const [custAge] = await dbConnection.query('SELECT * FROM cust_age WHERE cust_id = ?', [cust_id]);
    const [custName] = await dbConnection.query('SELECT * FROM cust_name WHERE cust_id = ?', [cust_id]);
    const [custDetail] = await dbConnection.query('SELECT * FROM cust_detail WHERE cust_id = ?', [cust_id]);

    if (!custDetail.length) {
      console.log("User not found with cust_id:", cust_id); // Debugging: check if user exists
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("Sending user data for cust_id:", cust_id); // Debugging: confirm data to be sent

    // Send all fetched data as a JSON response
    res.status(200).json({
      cust_info: custInfo[0] || null, // Include null if no data is found
      cust_address: custAddress[0] || null,
      cust_phone: custPhone[0] || null,
      cust_age: custAge[0] || null,
      cust_name: custName[0] || null,
      cust_detail: custDetail[0],
    });

    console.log("Data sent successfully");
  } catch (error) {
    console.error('Error fetching user info:', error); // Detailed error logging
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};





// Endpoint to verify if a customer ID is valid
// router.post('/api/users/verify'
 async function verify (req, res)  {
  const { cust_id } = req.body;

  try {
    const sql2= 'SELECT cust_id FROM cust_detail WHERE cust_id = ?'
    const [results] = await dbConnection.query( sql2, [cust_id]);
    if (results.length > 0) {
      res.status(200).json({ verified: true }); // Return success if ID is valid
    } else {
      res.status(404).json({ verified: false, message: 'Invalid customer ID' }); // Failure response
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ verified: false, message: 'Server error during verification' });
  }
};

module.exports = {userinfo,verify};




