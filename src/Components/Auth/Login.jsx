import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Reuse the same styling

const Login = () => {
  const navigate = useNavigate();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik setup for login form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Login Data:", values);

      try {
        // Sending the login request to backend
        const response = await axios.post("http://localhost:8080/user/request/token", {
          email: values.email,
          password: values.password,
        });
        console.log("Login Response:", response.data);
        alert("Login Successful!");
        // On successful login, navigate to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        alert("Login Failed! Please check your credentials.");
      }
    },
  });

  return (
    <div className="signup-container">
      {/* Toggle Panel */}
      <div className="toggle-box">
        <div className="toggle-panel">
          <h1>Welcome Back!</h1>
          <h5>Don't have an account?</h5>
          <button className="btn signup-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <h2>Login to Your Account</h2>

        <div className="input-box">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            {...formik.getFieldProps("email")}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>

        <div className="input-box">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div>

        <button type="submit" className="submit">
          Login
        </button>

        {/* Forgot Password Link */}
        <div className="forgot-password-link">
          <a href="" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
