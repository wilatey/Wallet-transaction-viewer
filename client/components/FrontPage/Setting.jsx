// src/components/BackendPage/Setting.jsx
import { useState, useEffect } from "react";
import { BiPalette, BiImage, BiCheck } from "react-icons/bi";

// Preset Avatars
const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
];

function Setting() {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedAvatar = localStorage.getItem("userAvatar") || avatars[0];
    const savedTheme = localStorage.getItem("theme") === "dark";
    setSelectedAvatar(savedAvatar);
    setDarkMode(savedTheme);
  }, []);

  const handleAvatarSelect = (url) => {
    setSelectedAvatar(url);
    localStorage.setItem("userAvatar", url);
    // Trigger a custom event so Header updates immediately
    window.dispatchEvent(new Event("storage"));
    alert("Avatar updated! (Refresh page to see changes in Header)");
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    alert("Theme preference saved (UI update pending implementation)");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-2">
          Customize your dashboard appearance.
        </p>
      </div>

      {/* 1. Appearance / Avatar */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <BiImage size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Profile Avatar</h2>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Select an avatar to display in your header.
        </p>

        <div className="flex flex-wrap gap-4">
          {avatars.map((url, index) => (
            <button
              key={index}
              onClick={() => handleAvatarSelect(url)}
              className={`relative rounded-full p-1 transition-all duration-200 ${
                selectedAvatar === url
                  ? "ring-4 ring-purple-500 scale-110"
                  : "ring-1 ring-gray-200 hover:ring-purple-300 hover:scale-105"
              }`}
            >
              <img
                src={url}
                alt={`Avatar ${index}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              {selectedAvatar === url && (
                <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full text-xs shadow-md">
                  <BiCheck />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interface Settings */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gray-100 text-gray-600 rounded-xl">
            <BiPalette size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Appearance</h2>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <h3 className="font-semibold text-gray-800">Dark Mode</h3>
            <p className="text-sm text-gray-500">
              Switch between light and dark themes.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${
              darkMode ? "bg-gray-800" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
