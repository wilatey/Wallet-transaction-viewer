import { BiSearch } from "react-icons/bi";
import { format, startOfDay, subDays } from "date-fns";
import { CiBellOn, CiCalendar, CiShare2 } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  Send,
  Receipt,
  Repeat,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState, useMemo } from "react";

function Dashboard() {
  const [istDropdownOpen, setisDropDownOpen] = useState(false);
  const [currentDateTime, setcurrentDateTime] = useState(new Date());

  const handleAvatarClick = () => {
    setisDropDownOpen(!istDropdownOpen);
  };

  const stats = {
    totalBalance: 50834.22,
    totalIncome: 12000.0,
    totalExpenses: 7185.78,
    cashFlow: 4814.22,
  };

  const recentTransactions = [
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
  ];

  const chartData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: format(subDays(new Date(), 6 - i), "EEEE"),
      expense: Math.floor(Math.random() * 2500 + 500),
    }));
  }, []);

  const maxExpense = Math.max(...chartData.map((d) => d.expense));

  useEffect(() => {
    const interval = setInterval(() => setcurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white/80 rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {change && (
          <span
            className={`text-sm font-medium ${
              change > 0 ? "text-green-600" : "text-red-600"
            } flex items-center`}
          >
            {change > 0 ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">
        ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      {/* {Dashboard heading} */}
      <div className="p-5">
        <div className="justify-between flex-wrap flex items-end gap-4">
          <div className="flex-1">
            <h2 className="pageheader">Welcome back!</h2>
            <p className="w-100 text-gray-500 mt-2">
              Here is what's happening with your wallet today
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border-1 border-gray-300">
              <CiCalendar size={20} />
              <span className="font-medium ">
                {format(currentDateTime, "MMMM d, yyyy")}
              </span>
            </div>
            <button className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border-1 border-gray-300 hover:shadow-md hover:bg-gray-100 cursor-pointer">
              <IoCloudUploadOutline size={20} />
              <span className="font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* StatCard Section*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-5  ">
          <StatCard
            title="Total Balance"
            value={stats.totalBalance}
            icon={DollarSign}
            color="bg-blue-600"
            change={12.5}
          />
          <StatCard
            title="Total Income"
            value={stats.totalIncome}
            icon={ArrowUpRight}
            color="bg-green-600"
            change={8.2}
          />
          <StatCard
            title="Total Expenses"
            value={stats.totalExpenses}
            icon={ArrowDownRight}
            color="bg-red-600"
            change={-3.1}
          />
          <StatCard
            title="Net Cash Flow"
            value={stats.cashFlow}
            icon={TrendingUp}
            color="bg-purple-600"
          />
        </div>
      </div>

      {/* Main contest grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full px-5 pb-10">
        {/* left Column: Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Recent Transactions
              </h3>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700 cursor-pointer">
                View All
              </button>
            </div>

            <div className="divide-y divide-gray-50">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${
                        tx.type === "receive"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {tx.type === "receive" ? (
                        <ArrowDownRight size={20} />
                      ) : (
                        <ArrowUpRight size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {tx.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(tx.date, "EEEE MMMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-bold ${
                      tx.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right Column: Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  icon: Send,
                  label: "Send",
                  color: "bg-blue-600 text-white",
                },
                {
                  icon: Receipt,
                  label: "Receive",
                  color: "bg-emerald-500 text-white",
                },
                {
                  icon: Repeat,
                  label: "Swap",
                  color: "bg-violet-500 text-white",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col w-3lx items-center gap-2 group cursor-pointer max-w-2xs"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm transition-all group-hover:scale-110 group-active:scale-95 ${action.color}`}
                  >
                    <action.icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Insight */}
          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
            <h3 className="font-semibold mb-1">Weekly Insight</h3>
            <p className="text-blue-100 text-sm mb-6">
              Spending trend for the last 7 days
            </p>

            {/* Chart Container */}
            <div className="h-32 flex items-end justify-between gap-2">
              {chartData.map((d, i) => {
                const heightPercentage = (d.expenses / (maxExpense || 1)) * 100;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 w-full group cursor-pointer"
                  >
                    <div className="relative w-full flex items-end h-full">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${d.expenses}
                      </div>

                      <div
                        className="w-full bg-blue-400/40 rounded-sm hover:bg-white/90 transition-all duration-300 ease-out"
                        style={{ height: `${heightPercentage}%` }}
                      ></div>
                    </div>

                    <span className="text-[10px] text-blue-200 font-medium">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
