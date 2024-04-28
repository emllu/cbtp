const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const dbconnection=require('../dbconfig/dbconfig')

const express=require('express')
const app=express();
const { StatusCodes } = require('http-status-codes');
// importing module for login functionaliy 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Rate limiting middleware
const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 5 requests per windowMs
    message: "Too many registration attempts from this IP, please try again later"
});






async function register(req, res) {
    // Check if the request is within rate limit
    
    if (req.rateLimit.remaining === 0) {
        return res.status(429).json({ error: "Too many registration attempts from this IP, please try again later" });
    }

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring request body
    const {
        cust_name = {},
        cust_bdate,
        cust_sexo,
        nationality,
        cust_job,
        cust_address = {},
        cust_phone = {},
        cust_age = {},
        cust_detail = {}
    } = req.body;
console.log(req.body)
    // Destructure cust_name object
    const {   F_name, L_name } = cust_name;
    // Destructure cust_address
    const { keb_name, House_no, city } = cust_address;
    // Destructure cust_phone object
    const { phone1, phone2 } = cust_phone;
    // Destructure cust_age object
    const { cust_age: customer_age } = cust_age;
    const { username, email, password} = cust_detail;

    try {
        // Check if user already exists
        const [existingUsers] = await dbconnection.query("SELECT  username, cust_id FROM cust_detail WHERE username=? OR email=?", [username,email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        // Generate a unique user ID not greater than 6 digits
        const userId = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6);

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Start a database transaction
        await dbconnection.beginTransaction();

        // Insert customer information into database tables
        const sql1 = 'INSERT INTO cust_infos (cust_id,cust_bdate, cust_sexo, nationality, cust_job) VALUES (?,?, ?, ?, ?)';
        const sql2 = 'INSERT INTO cust_address (cust_id, keb_name, House_no, city) VALUES (?,?, ?, ?)';
        const sql3 = 'INSERT INTO cust_phone ( cust_id,phone1, phone2) VALUES (?,?, ?)';
        const sql4 = 'INSERT INTO cust_age (cust_id, cust_age) VALUES (?,?)';
        const sql5 = 'INSERT INTO cust_name (cust_id, F_name, L_name) VALUES (?, ?, ?)';
        const sql6 = 'INSERT INTO cust_detail ( cust_id, username, email, password) VALUES (?, ?, ?, ?)';

        await dbconnection.query(sql5, [ userId,F_name, L_name]);
        await dbconnection.query(sql4, [userId,customer_age]);
        await dbconnection.query(sql3, [userId,phone1, phone2]);
        await dbconnection.query(sql2, [userId,keb_name, House_no, city]);
        await dbconnection.query(sql1, [userId,cust_bdate, cust_sexo, nationality, cust_job]);
        await dbconnection.query(sql6, [userId, username, email, hashedPassword]);
     


    // Destructure request body
    
        await dbconnection.commit();
       
        

        // Respond with success message
        return res.status(201).json({ msg: "User created successfully" });
        console.log("user creted")
    } catch (error) {
        // Rollback the transaction if any error occurred
        await dbconnection.rollback();

        // Log the error
        console.error("Error creating user:", error);

        // Handle the error appropriately
        return res.status(500).json({ error: "An unexpected error occurred while creating user" });
    }
}


   
async function logs(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter all required fields" });
    }
   
        // Checking if the email exists
       
            try {
                // Checking if the email exists
                const [user] = await dbconnection.query("SELECT admin_id, username, email, Password FROM admins WHERE email=?", [email]);

        
                // If there is no user with the provided email
                if (user.length === 0) {
                    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "There is no user with the provided email. Please register." });
                }
        
                // Checking the password
                const isPasswordValid = await bcrypt.compare(password, user[0].Password);
                if (isPasswordValid) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Incorrect password" });
                }
        
                // If email and password are correct, generate JWT
                const secretKey = "your-secret-key"; // Replace this with your actual secret key
                const username = user[0].username;
                const userid = user[0].admin_id;
                const token = jwt.sign({ username, userid }, secretKey, { expiresIn: "1d" });
        
                console.log("User login successful:", { username, userid }); // Log successful login
                return res.status(StatusCodes.OK).json({ msg: "User login successful", token });
        
            } catch (err) {
                console.error("Error in login:", err); // Log error
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, please try again" });
            }
        }
      

        // If there is no user with the provided email
        



  
 
  
  async function adminRegister(req, res) {
    const { username, email, password } = req.body;
  console.log(req.body)
  console.log(req.body.password)
    try {
      // Check if the admin already exists
      const [existingAdmins] = await dbconnection.query("SELECT * FROM admins WHERE username=? OR email=?", [username, email]);
      if (existingAdmins.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Admin already exists' });
      }
  
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the generated salt
  
      // Insert the admin with the hashed password into the database
      const sql = 'INSERT INTO admins (username, email, Password) VALUES (?, ?, ?)';
      await dbconnection.query(sql, [username, email, hashedPassword]);
  
      // Generate a JWT token
    //   const token = jwt.sign({ username, email }, 'your-secret-key', { expiresIn: '1h' }); // Replace with your secret key
  
      return res.status(StatusCodes.CREATED).json({ msg: 'Admin registered successfully' });
    } catch (error) {
      console.error('Error registering admin:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error registering admin' });
    }
  }
  
async function check(req, res) {

    try {
        const userid  = req.user.userid; 
        const  username = req.user.username; 
    
        res.status(200).json({ msg:{username,userid }}); // Respond with user information
      } catch (error) {
        console.error("Error in check:", error); // Log any error
        res.status(500).json({ msg: "Internal server error" }); // Handle server errors
      }
    
}


module.exports = {
    register,
    registerLimiter,logs,adminRegister,check// Export rate limiting middleware
};















//   console.error("Error creating user:", error);


//ch2 3 question 5 mark total 15  only coding
//ch4 5-8 all 25 
//ch3 scheduling  1 question 5 theory
//ch3 coding sensor 
//coding minimum 15mark sensor and ch2
//theory ch3-ch5
//gps hw and sw  design archtecture req  write and expalin and draw archtecture write detail 