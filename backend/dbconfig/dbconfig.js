require('dotenv').config(); // Load .env file
const mysql = require('mysql2');

const dbconnection = mysql.createConnection({
    user: "root",
    password:"emluti1234",
    host: "localhost",
    database:"projects"
});

console.log("succesfully create")
module.exports = dbconnection.promise();
