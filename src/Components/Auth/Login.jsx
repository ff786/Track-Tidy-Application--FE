import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; 

const Login = () => {
  const navigate = useNavigate();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  // Formik setup for login form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Login Data:", values);

      try {
        // Sending the login request to backend
        const response = await axios.post("http://localhost:8080/api/track-tidy/user/request/token", {
          email: values.email,
          password: values.password,
          role: values.role,
        });
        console.log("Login Response:", response.data);
        alert("Login Successful!");
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
      {/* Toggle Panel */}
      <div className="HSDtoggle-box">
        <div className="HSDtoggle-panel">
          <h1>Welcome Back!</h1>
          <h5>Don't have an account?</h5>
          <button className="HSDbtn" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>

      {/* Login Form */}
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

        <div className="HSDinput-box">
          <label>Role:</label>
          <select name="role" {...formik.getFieldProps("role")}>
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Vendor">Vendor</option>
            <option value="Staff">Staff</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="error">{formik.errors.role}</p>
          )}
        </div>

        <button type="submit" className="HSDsubmit">
          Login
        </button>

        {/* Forgot Password Link */}
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
