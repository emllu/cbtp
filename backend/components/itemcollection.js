const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection = require('../dbconfig/dbconfig'); // Database connection setup
const app = express();
 
const itemcollection = async (req, res) => {
    app.use(bodyParser.json()); 
    
  const { userId, total, cart } = req.body; 
  
  console.log(req.body)

  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear(); 

    
        let sql1 = `SELECT * FROM purchases  WHERE user_id = $1AND EXTRACT(MONTH FROM purchase_date) = $2AND EXTRACT(YEAR FROM purchase_date) = $3
          AND product_name = ANY ($4)`;
      const values = [
        userId,             
        currentMonth + 1,   
        currentYear,        
        ['Oil', 'Sugar']    
      ];
     await dbconnection.query(sql1, values)

    if (existingPurchases.rowCount > 0) {
      return res.status(400).json({error: "You've already bought oil or sugar this month."});
    }

    for (const item of cart) {
      await dbconnection.query(
        `INSERT INTO purchases (user_id, product_name, product_price, total) VALUES ($1, $2, $3, $4)`,[userId, item.product_name, item.product_price, total] 
      );
    }
 res.status(200).json({message: 'Purchase successful', total }); // Return success message and total cost
  } 
  catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({
      error: 'Error processing purchase'
    });
  }
};


module.exports =  itemcollection ; 
