import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function TransactionListener({ walletAddress }) {
  const navigate = useNavigate();
  const notify = ({ transaction }) => {
    toast(
      ({ closeToast }) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/transactions/${transaction.id}`);
            closeToast();
          }}
        >
          <strong>New Transaction Received </strong>
          <p>Amount: {transaction.amount}</p>
          <p>From: {transaction.wallet_address.slice(0, 6)}...</p>
        </div>
      ),
      {
        autoClose: 5000,
        closeButton: false,
        position: "bottom-right",
        onClick: () => navigate(`/transactions/${transaction.id}`),
      }
    );
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.send(
        JSON.stringify({
          type: "subscribe",
          walletAddress,
        })
      );
    };

    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === "New_Transaction" && data.walletAddress === walletAddress) {
        navigate(`/transactions/${data.id}`);
        notify(data);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => ws.close();
  }, [navigate, walletAddress]);
  return <ToastContainer />;
}
