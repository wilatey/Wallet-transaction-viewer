// src/components/BackendPage/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BiUser,
  BiEnvelope,
  BiShield,
  BiTrash,
  BiLockAlt,
} from "react-icons/bi";

function Profile() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Get data from storage
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  // Mock ID for display
  const userId = "UID-" + userEmail.split("@")[0].toUpperCase().slice(0, 5);

  const handleResetPassword = () => {
    alert(`Password reset link sent to ${userEmail}`);
  };

  const handleDeleteAccount = () => {
    // 1. In a real app, call API DELETE /api/users
    // 2. Clear storage
    localStorage.clear();
    // 3. Redirect
    navigate("/register");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 mt-2">
          Manage your account information and security.
        </p>
      </div>

      {/* 1. Account Information Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <BiUser size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Personal Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">
              Full Name
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
              <BiUser className="text-gray-400 text-lg" />
              {userName}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">
              Email Address
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium">
              <BiEnvelope className="text-gray-400 text-lg" />
              {userEmail}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">User ID</label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-500 font-mono text-sm">
              <BiShield className="text-gray-400 text-lg" />
              {userId}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Security & Danger Zone */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Reset Password */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <BiLockAlt size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Security</h2>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Concerned about your account safety? You can update your password
            here.
          </p>
          <button
            onClick={handleResetPassword}
            className="w-full py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Reset Password
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100 h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <BiTrash size={24} />
            </div>
            <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
          </div>
          <p className="text-red-400 text-sm mb-6">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
            >
              Delete Account
            </button>
          ) : (
            <div className="flex gap-2 animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => handleDeleteAccount()}
                className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
