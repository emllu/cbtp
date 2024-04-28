const dbConnection = require('../dbconfig/dbconfig'); // Corrected variable name

async function getAllItems(req, res) {
  try {
    // Retrieve the cust_id from the request
    const cust_id = req.body.cust_id || req.query.cust_id;

    if (!cust_id) {
      return res.status(400).json({ error: 'cust_id is required' });
    }

    // Verify if the customer exists
    const [custDetail] = await dbConnection.query(
      'SELECT * FROM cust_detail WHERE cust_id = ?',
      [cust_id]
    );

    if (!custDetail.length) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Fetch items for the specific customer
    const [items] = await dbConnection.query(
      'SELECT * FROM items ',
      [cust_id]
    );

    if (!items.length) {
      return res.status(404).json({ error: 'No items found for this customer' })
      console.log("not found");
    }

    // Send the items data to the frontend
    return res.status(200).json({ items: items });
    console.log(items)
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function insertion (req, res)  {
  const { name, price, quantity, img_url } = req.body;

  const query = 'INSERT INTO items (name, price, quantity, img_url) VALUES (?, ?, ?, ?)';
  dbConnection.query(query, [name, price, quantity, img_url], (err, result) => {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json({ message: 'Item added', id: result.insertId });
      }
  });
};
async function updation(req,res){

  const { id } = req.params;
  const updates = [];
  const values = [];

  if (req.body.name) {
    updates.push('name = ?');
    values.push(req.body.name);
  }
  if (req.body.price) {
    updates.push('price = ?');
    values.push(req.body.price);
  }

  if (req.body.quantity) {
    updates.push('quantity = ?');
    values.push(req.body.quantity);
  }
  if (req.body.img_url) {
    updates.push('img_url = ?');
    values.push(req.body.img_url);
  }

  values.push(id);

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields provided for update' });
  }

  const query = `UPDATE items SET ${updates.join(', ')} WHERE id = ?`;

  dbConnection.query(query, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ message: 'Item updated successfully' });
    }
  });
};

  

async function deletion(req,res){

  // app.delete('/items/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM items WHERE id = ?';
    dbConnection.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item deleted' });
        }
    });
};




module.exports = {getAllItems,insertion,updation,deletion};
