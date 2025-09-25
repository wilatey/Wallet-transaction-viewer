const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const clients = new Set();

const wss = new WebSocket.Server({ server });

// handle clients connection via Websocket
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

wss.on("message", (message) => {
  console.log(`Received message: ${message}`);
});

function broadcaastTransaction(transactions) {
  const mssage = JSON.stringify({
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

db.pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.message, err.stack);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL database!");
  release();
});
