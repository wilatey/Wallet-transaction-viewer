// src/components/Header.jsx
import { useState } from "react";
import { BiLogOut, BiSearch } from "react-icons/bi";
import { CiBellOn, CiShare2 } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Guest";
  const userInitials = userName.slice(0, 2).toUpperCase();

  const defaultAvatar =
    "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=128";
  const userAvatar = localStorage.getItem("userAvatar") || defaultAvatar;

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const initiateLogout = () => {
    setIsDropdownOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleMenuClick = (item) => {
    setIsDropdownOpen(false);

    switch (item) {
      case "Profile":
        console.log("Navigating to Profile...");
        navigate("/profile");
        break;
      case "Setting":
        console.log("Navigating to Setting...");
        navigate("/settings");
        break;
      case "Logout":
        initiateLogout();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-20">
        {/* --- FANCY SEARCH BAR --- */}
        <div className="flex-1 max-w-lg transition-all duration-300 ease-in-out">
          <div
            className={`flex items-center rounded-2xl px-4 py-2.5 transition-all duration-300 border ${
              isSearchFocused
                ? "bg-white ring-2 ring-blue-400 border-transparent shadow-lg w-full"
                : "bg-gray-100 border-transparent w-full md:w-3/4 hover:bg-gray-50"
            }`}
          >
            <BiSearch
              size={22}
              className={`transition-colors duration-300 ${
                isSearchFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search transactions, wallets..."
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 font-medium"
            />
          </div>
        </div>

        {/* --- ICONS & PROFILE --- */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600">
            <CiBellOn size={28} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600">
            <CiShare2 size={28} />
          </button>

          {/* User Dropdown Section */}
          <div className="relative h-10 border-l pl-5 border-gray-200">
            <Avatar
              onClick={handleAvatarClick}
              className="cursor-pointer group"
            >
              <AvatarImage
                src={userAvatar}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-400 transition-all duration-300"
              />
              <AvatarFallback className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-md">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="px-5 py-3 border-b border-gray-50 mb-2">
                  <p className="text-sm font-bold text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">View Profile</p>
                </div>

                {["Profile", "Setting", "Logout"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleMenuClick(item)}
                    className={`w-full text-left px-5 py-3 text-sm transition-all flex items-center gap-3 font-medium cursor-pointer hover:bg-gray-50
                    ${
                      item === "Logout"
                        ? "text-red-500 hover:bg-red-50 hover:pl-7"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:pl-7"
                    }`}
                  >
                    {item === "Logout" && <BiLogOut />}
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- LOGOUT CONFIRMATION MODAL (POP WINDOW) --- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-100 transform transition-all border border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BiLogOut className="text-red-500 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Log Out?</h3>
              <p className="text-gray-500 mb-8">
                Are you sure you want to sign out? You will need to enter your
                credentials to access your account again.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all hover:scale-[1.02]"
                >
                  Yes, Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
