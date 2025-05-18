import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        formData,
        { withCredentials: true }
      );

      console.log("Signup successful:", response.data);

      if (response.data.success) {
        navigate("/login"); // redirect to login on success
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        src="./hero.webm"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/75 z-10"></div>

      <div className="relative z-20 w-full max-w-md bg-grey/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account on{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-t from-gray-300 to-white">
            TrendWrite
          </span>
        </h2>

        {error && (
          <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
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
              placeholder="Create a password"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-t from-gray-300 to-white text-black font-semibold py-2 rounded-xl hover:from-blue-300 hover:to-blue-50 transition duration-150"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
