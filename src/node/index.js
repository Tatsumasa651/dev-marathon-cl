const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 4972;

const cors = require("cors");
app.use(cors());

const { Pool } = require("pg");
const pool = new Pool({
  user: "user_tatsumasa_nakano", // PostgreSQLのユーザー名に置き換えてください
  host: "localhost",
  database: "db_tatsumasa_nakano", // PostgreSQLのデータベース名に置き換えてください
  password: process.env.DB_PASSWORD, // PostgreSQLのパスワードに置き換えてください
  port: 5432,
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

app.get("/customers", async (req, res) => {
  try {
    const customerData = await pool.query("SELECT * FROM customers");
    res.send(customerData.rows);
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/add-customer", async (req, res) => {
  try {
    const { companyName, industry, contact, location } = req.body;
    const newCustomer = await pool.query(
      "INSERT INTO customers (company_name, industry, contact, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [companyName, industry, contact, location]
    );
    res.json({ success: true, customer: newCustomer.rows[0] });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.use(express.static("public"));

const path = require('path');
app.use(express.static(path.join(__dirname, 'src/web')));

app.get("/customer/:id", async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await pool.query("SELECT * FROM customers WHERE customer_id = $1", [customerId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "顧客が見つかりません" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "サーバーエラー" });
  }
});

app.delete('/api/customer/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM customers WHERE customer_id = $1',
      [req.params.id]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.put('/customer/:id', async (req, res) => {
  const { company_name, industry, contact, location } = req.body;
  try {
    await pool.query(
      'UPDATE customers SET company_name = $1, industry = $2, contact = $3, location = $4 WHERE customer_id = $5',
      [company_name, industry, contact, location, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});


