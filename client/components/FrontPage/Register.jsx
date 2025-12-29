// src/components/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiDockTop, BiMailSend, BiLockAlt, BiUser } from "react-icons/bi";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Redirect to login
        alert("Account created successfully! Please sign in.");
        navigate("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden relative">
      {/* Background Animation (Same as Login) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -150, 0], y: [0, 150, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/20 max-w-md w-full mx-4"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg mb-4">
            <BiDockTop className="text-white text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-white/70 text-sm mt-2">Join LTRansact today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <BiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
            />
          </div>
          {/* Email */}
          <div className="relative">
            <BiMailSend className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm text-center bg-red-500/20 py-2 rounded-lg border border-red-500/30">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-300 hover:text-white font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
