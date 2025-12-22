// src/components/Header.jsx
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiBellOn, CiShare2 } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function Header() {
  const [istDropdownOpen, setisDropDownOpen] = useState(false);

  const handleAvatarClick = () => {
    setisDropDownOpen(!istDropdownOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex-1 max-w-md">
        <div className="searchbar flex items-center bg-gray-100 rounded-lg px-2">
          <BiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions, wallets..."
            className="w-full pl-2 pr-4 py-2.5 bg-transparent focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <CiBellOn
          size={40}
          className="selector1 cursor-pointer hover:bg-gray-100 rounded-full p-2"
        />
        <CiShare2
          size={40}
          className="selector2 cursor-pointer hover:bg-gray-100 rounded-full p-2"
        />
        <div className="relative h-10 border-l pl-4 border-gray-200 ml-4">
          <Avatar onClick={handleAvatarClick} className="cursor-pointer">
            <AvatarImage
              src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
            />
            <AvatarFallback className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold flex items-center justify-center">
              JD
            </AvatarFallback>
          </Avatar>
          {istDropdownOpen && (
            <div className="absolute right-0 mt-3 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {["Profile", "Setting", "Logout"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  onClick={() => setisDropDownOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
