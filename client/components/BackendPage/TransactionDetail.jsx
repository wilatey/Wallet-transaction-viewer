import { useEffect, useState } from "react";
import { useParams } from "react-router";

function TransactionDetail() {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/transactions/${transactionId}`)
      .then((res) => res.json())
      .then((data) => setTransaction(data))
      .catch((err) => console.error("Error fetching transaction:", err));
  }, [transactionId]);

  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h2>Transaction {transactionId}</h2>
      <p>Wallet: {transaction.wallet_address}</p>
      <p>Type: {transaction.type}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Date: {new Date(transaction.date).toLocaleString()}</p>
    </div>
  );
}
export default TransactionDetail;
