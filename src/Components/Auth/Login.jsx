import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

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
        const response = await fetch('http://localhost:8080/api/track-tidy/user/request/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),

          email: values.email,
          password: values.password,
          role: values.role,
        });

        // Admin credentials check before sending the request
        const adminEmail = "admin@example.com"; // Replace with the actual admin email
        const adminPassword = "adminPassword123"; // Replace with the actual admin password

        // Check if it's the admin login
        if (values.email === adminEmail && values.password === adminPassword) {
          alert("Admin Login Successful! Navigating to Admin Dashboard.");
          navigate("/user-List"); // Navigate to admin dashboard
          return; // Stop further processing if it's admin login
        }
        const data = await response.json();
        console.log("Login Response:", response.data);
        alert("Login Successful!");
        sessionStorage.setItem('access_token', data.access_token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        alert("Login Failed! Please check your credentials.");
      }
    },
  });


  return (
    <div className="HSDlogin-page">
      <div className="HSDsignup-container">
        <div className="HSDtoggle-box">
          <div className="HSDtoggle-panel">
            <h1>Welcome Back!</h1>
            <h5>Don't have an account?</h5>
            <button className="HSDbtn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="HSDsignup-form">
          <h2>Login to Your Account</h2>

          <div className="HSDinput-box">
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

          <div className="HSDinput-box">
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

          <button type="submit" className="HSDsubmit">
            Login
          </button>

          <div className="HSDforgot-password-link">
            <a href="#" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
