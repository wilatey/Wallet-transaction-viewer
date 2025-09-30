import { BiSearch } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";

function Dashboard() {
  return (
    <div className="flex flex-col">
      <header className="border-b-1 border-b-gray-200  mb-10">
        <BiSearch size={20} className="icon" />
        <input className="searchbar" placeholder="      Search" />
        <CiBellOn size={25} className="bell" />
      </header>
      <div className="ml-5">
        <h2 className="pageheader text-2xl font-bold justify-start items-start ">
          Welcome back, !
        </h2>
        <p className="text-gray-500">
          Track your finances and achieve your financial goals
        </p>
      </div>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Spending Limits</h3>
        <p className="text-sm text-gray-500">
          Today Transaction Limit: Sep 30, 2025
        </p>
        <div className="flex items-center justify-between mt-2">
          <span>$50,834.22</span>
          <span className="text-green-500">+75.06%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            className="bg-yellow-400 h-2 rounded"
            style={{ width: "75%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-500">Available credit limit</p>
      </div>

      {/* Transaction Overview (Placeholder for Chart) */}
      <div className="mt-4 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Transaction Overview</h3>
        <div className="flex justify-between text-sm text-gray-500">
          <span>30 Days</span>
          <span>Last Week</span>
        </div>
        <div className="h-40 flex items-center justify-center bg-gray-100">
          Transaction Chart Placeholder
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
