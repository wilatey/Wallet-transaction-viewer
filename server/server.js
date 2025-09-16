const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

db.pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.message, err.stack);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL database!");
  release();
});

app.post("/setup-db", async (req, res) => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
      );
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        amount DECIMAL(10, 2) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description TEXT
      );
    `);
    res.status(200).send("Database tables created!");
  } catch (err) {
    console.error("Error setting up database:", err.message);
    res.status(500).send("Error setting up database");
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM transactions ORDER BY date DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).send("Error fetching transactions");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
