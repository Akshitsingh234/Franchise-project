import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";
import { User, Lock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token);
        navigate("/admin");
      } else {
        alert("Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      alert("Error while logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Optional subtle spotlight or gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-900 opacity-50"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md text-white border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-300">
          Admin Login
        </h2>

        {/* Username */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">Username</label>
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300" />
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-8 relative">
          <label className="block text-sm font-medium mb-2">Password</label>
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300" />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
