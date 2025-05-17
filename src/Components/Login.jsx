import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    try {
      const response = await axios.post(
        "http://localhost:3003/user/login",
        formData,
        { withCredentials: true }
      );

      console.log("Login success:", response.data);

      if (response.data.success) {
        navigate("/"); // Redirect on success
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
