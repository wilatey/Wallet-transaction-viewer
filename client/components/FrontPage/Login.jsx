// src/components/Login.jsx - Fixed & Enhanced Advanced UI
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiDockTop, BiMailSend, BiLockAlt } from "react-icons/bi";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userName", data.name);
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden relative">
      {/* Background Animation */}
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
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg mb-6">
            <BiDockTop className="text-white text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">LTRansact</h1>
          <p className="text-white/80 text-lg">
            Sign in to your wallet dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <BiMailSend className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="emailpassword_input"
              required
            />
          </div>

          <div className="relative">
            <BiLockAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="emailpassword_input"
              required
            />
          </div>

          {error && (
            <p className="text-red-300 text-sm text-center bg-red-500/20 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="submit_button">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="text-cyan-300 hover:text-white font-semibold transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
