import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext"; // adjust if needed

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
     
        const meRes = await axios.get("http://localhost:3000/user/me", {
          withCredentials: true,
        });

        if (meRes.data.success) {
          setUser(meRes.data.user); 
          navigate("/home");
        } else {
          setError("Login succeeded but failed to fetch user.");
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative ">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        src="/hero.webm"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/75 z-10" />
      <div className="relative z-20 w-full max-w-md bg-grey/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Log In to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
            BlogX
          </span>
        </h2>

        {error && (
          <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-t from-gray-300 to-white text-black font-semibold py-2 rounded-xl hover:from-blue-300 hover:to-blue-50 transition duration-150"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
