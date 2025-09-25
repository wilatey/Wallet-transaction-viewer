import { ethers } from "ethers";

async function watchTransactions(walletAddress, ws) {
  const provider = new ethers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/d2bef4559f634a1e87e6c99a3c155606"
  );
  provider.on("pending", async (txHash) => {
    const tx = await provider.getTransaction(txHash);
    if (tx && tx.from === walletAddress) {
      const newTransaction = {
        id: txHash,
        wallet_address: tx.from,
        amount: ethers.formatEther(tx.value),
        type: "transfer",
        date: new Date(),
      };
      await fetch("https://localhost:3000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
    }
  });
}
