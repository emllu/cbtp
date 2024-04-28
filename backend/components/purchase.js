const express = require('express');
const dbconnection = require('../dbconfig/dbconfig');
const multer = require('multer');
const router = express.Router();

const restrictedItems = ['oil', 'sugar']; // Items with purchase restrictions

// Utility function to get the current year and month
function getCurrentYearAndMonth() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}
const storage=multer.diskStorage({destination:(req,file,cb)=>{cb(null,'./Images')},filename:(req,file,cb)=>{cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))}})
const upload=multer({storage:storage})
async function purchase(req, res) {
  const { cust_id, cart, total } = req.body;

  if (!cust_id || !cart || !total) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const { year, month } = getCurrentYearAndMonth();

  try {
    for (const item of cart) {
      const { name, price } = item;

      if (restrictedItems.includes(name)) {
        const checkQuery = `
          SELECT * FROM restricted_purchases 
          WHERE cust_id = ? 
            AND purchase_year = ? 
            AND purchase_month = ? 
            AND product_name = ?
        `;
        const checkValues = [cust_id, year, month, name];

        const existingPurchase = await dbconnection.query(checkQuery, checkValues);

        if (existingPurchase[0].length > 0) { // Ensure existingPurchase is not empty
          return res.status(400).json({
            error: `You've already purchased ${name} this month. You can't buy it again.`,
          });
        }

        // Insert into restricted_purchases if it's a new purchase
        const restrictedInsertQuery = `
          INSERT INTO restricted_purchases (cust_id, product_name, purchase_year, purchase_month)
          VALUES (?, ?, ?, ?)
        `;
        await dbconnection.query(restrictedInsertQuery, [cust_id, name, year, month]);
      }

      // Insert into the main purchases table (for all items)
      const purchasesInsertQuery = `
        INSERT INTO purchases (cust_id, product_name, product_price, total, purchase_date)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      await dbconnection.query(purchasesInsertQuery, [cust_id, name, price, total]);
    }

    res.status(200).json({ message: 'Purchase successful.' });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}


module.exports = {purchase}; // Export the purchase function for use in routes
