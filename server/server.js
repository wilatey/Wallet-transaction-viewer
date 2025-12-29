const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const db = require("./db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email and password are required" });
    }

    const userCheck = await db.pool.query(
      "Select * FROM users where email = $1",
      [email]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const generatedUserId = "U" + Date.now().toString().slice(-6);

    const newUser = await db.pool.query(
      "INSERT INTO users (user_id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [generatedUserId, name, email, hashedPassword]
    );

    res.json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await db.pool.query(
      "Select * from users where email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = userResult.rows[0];

    let isMatch = false;

    if (user.password.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;

      if (isMatch) {
        const newHash = await bcrypt.hash(password, 10);
        await db.pool.query("UPDATE users SET password = $1 WHERE email = $2", [
          newHash,
          email,
        ]);
      }
    }

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      token: "mock-jwt-token-" + user.user_id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error during login" });
  }
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const clients = new Set();

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");
  clients.add(ws);

  ws.on("message", (message) => {
    const { type, walletAddress } = JSON.parse(message.toString());
    if (type === "subscribe") {
      ws.walletAddress = walletAddress;
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

function broadcastTransaction(transactions) {
  const message = JSON.stringify({
    type: "New_Transaction",
    data: transactions,
  });
  clients.forEach((client) => {
    if (
      client.readyState === client.OPEN &&
      (!client.walletAddress ||
        client.walletAddress === transactions.wallet_address)
    ) {
      client.send(message);
    }
  });
}

db.pool.connect((error, client, release) => {
  if (error) {
    console.error(
      "Error connecting to PostgreSQL:",
      error.message,
      error.stack
    );
    return;
  }

  console.log("Connected to PostgreSQL database!");

  client.query("LISTEN new_transaction").catch((err) => {
    console.error("Error executing LISTEN query: ", err.stack);
  });

  client.on("notification", async (msg) => {
    if (msg.channel === "new_transaction") {
      try {
        const payload = JSON.parse(msg.payload);
        broadcastTransaction(payload);
      } catch (error) {
        console.error("Error processing notification: ", error);
      }
    }
  });
});
