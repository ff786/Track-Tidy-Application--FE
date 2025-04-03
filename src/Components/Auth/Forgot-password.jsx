import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the forgot password request to the backend
      const response = await axios.post("http://localhost:8080/user/forgot-password", { email });
      setMessage(response.data.message);
      setError(""); // Clear any previous errors
      alert("Password reset link sent to your email!");
      navigate("/login"); // Redirect back to login page after submission
    } catch (error) {
      console.error("Password reset failed:", error.response?.data || error.message);
      setError("An error occurred while sending the reset link. Please try again.");
      setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Reset Your Password</h2>

        <div className="input-box">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" className="submit">
          Submit
        </button>

        {/* Display Success or Error Message */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
