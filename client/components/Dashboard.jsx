import { BiSearch } from "react-icons/bi";
import {
  CiAvocado,
  CiBellOn,
  CiCalendar,
  CiCloud,
  CiShare2,
} from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

function Dashboard() {
  const [istDropdownOpen, setisDropDownOpen] = useState(false);
  const [currentDateTime, setcurrentDateTime] = useState(new Date());

  const handleAvatarClick = () => {
    setisDropDownOpen(!istDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setisDropDownOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setcurrentDateTime(new Date());
    }, 1000);
  });

  return (
    <div className="w-full flex flex-col">
      {/* {"Header Search"} */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex-1 mx-4 max-w-min">
          <div className="searchbar">
            <BiSearch size={20} />
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <CiBellOn size={40} className="bell" />
          <CiShare2 size={40} className="share" />
          <div className="h-10 border-l-1 pl-10  border-l-gray-200">
            <div className="cursor-pointer" onClick={handleAvatarClick}>
              <Avatar>
                <AvatarImage
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                  alt="User avatar"
                  className="avatarImage"
                />
                <AvatarFallback
                  delayMs={600}
                  className="rounded-full bg-gray-300 flex items-center justify-center"
                >
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
            {istDropdownOpen && (
              <div className="absolute right-0 mt-5 w-28 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul>
                  <li
                    className="avatarlist"
                    onClick={() => handleOptionClick("Profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="avatarlist"
                    onClick={() => handleOptionClick("Settings")}
                  >
                    Settings
                  </li>
                  <li
                    className="avatarlist"
                    onClick={() => handleOptionClick("Logout")}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* {Dashboard heading} */}
      <div className="p-5">
        <div className="justify-between flex-wrap flex items-end gap-4">
          <div className="flex-1">
            <h2 className="pageheader">Welcome back, User!</h2>
            <p className="w-100 text-gray-500 mt-2">
              Track your finances and achieve your financial goals
            </p>
          </div>

          <div className="items-center space-x-4">
            <div className="w-32 px-2 flex flex-1 rounded-lg shadow-sm border-1 border-gray-200">
              <CiCalendar size={35} />
              <p className="pt-3 text-sm shadow-sm">
                {currentDateTime.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="items-center space-x-2">
            <div className="w-32 px-2 flex flex-1 rounded-lg shadow-sm border-1 border-gray-200 justify">
              <IoCloudUploadOutline size={35} />
              <p className="pt-2 pl-2 pr-2 text-sm shadow-sm">explore</p>
            </div>
          </div>
        </div>
      </div>

      {/* {
      @todo:Cards with 
      i. Total balance, 
      ii. Total income, 
      iii. Total Expenditure, 
      iv. Cash Flow, 
      v. Recent Transaction, 
      vi. Payment and Transfer, 
      vii. Objectives} 
      */}

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
