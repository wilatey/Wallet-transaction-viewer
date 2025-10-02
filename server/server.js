const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

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
