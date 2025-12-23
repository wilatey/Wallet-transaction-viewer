import { format, subDays } from "date-fns";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Transaction() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Sample data for demonstration. In production, fetch from API like:
    // fetch(`${import.meta.env.VITE_API_URL}/transactions`)
    //   .then(res => res.json())
    //   .then(data => setTransactions(data));
    const sampleTransactions = [
      {
        id: "tx1",
        type: "receive",
        amount: 2500.0,
        from: "0x71C7...a51B",
        date: new Date(),
        description: "Salary Deposit",
      },
      {
        id: "tx2",
        type: "send",
        amount: -120.5,
        from: "0x89a1...f3d2",
        date: subDays(new Date(), 0),
        description: "Netflix Subscription",
      },
      {
        id: "tx3",
        type: "receive",
        amount: 800.0,
        from: "0x12ab...9e4f",
        date: subDays(new Date(), 1),
        description: "Freelance Payment",
      },
      {
        id: "tx4",
        type: "send",
        amount: -45.0,
        from: "0x56cd...8b2a",
        date: subDays(new Date(), 1),
        description: "Coffee Shop",
      },
      {
        id: "tx5",
        type: "receive",
        amount: 1500.0,
        from: "0x34ef...7c9d",
        date: subDays(new Date(), 2),
        description: "Project Bonus",
      },
      {
        id: "tx6",
        type: "send",
        amount: -200.0,
        from: "0x78gh...1i2j",
        date: subDays(new Date(), 3),
        description: "Grocery Shopping",
      },
      {
        id: "tx7",
        type: "receive",
        amount: 300.0,
        from: "0x90kl...3m4n",
        date: subDays(new Date(), 4),
        description: "Refund",
      },
      {
        id: "tx8",
        type: "send",
        amount: -75.0,
        from: "0xabop...5q6r",
        date: subDays(new Date(), 5),
        description: "Dinner Out",
      },
    ];
    setTransactions(sampleTransactions);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
        <p className="text-gray-600 mt-2">
          View and track all your wallet transactions with daily details
        </p>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Transactions
          </h2>
          <div className="space-y-4">
            {transactions.map((trans) => (
              <div
                key={trans.id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`${trans.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      trans.type === "receive"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {trans.type === "receive" ? (
                      <ArrowDownRight size={20} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {trans.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(trans.date, "MMMM d, yyyy - h:mm a")}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{trans.from}</p>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    trans.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trans.amount > 0 ? "+" : ""}$
                  {Math.abs(trans.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          {transactions.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No transactions found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Transaction;
