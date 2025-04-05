import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            <a href="#" onClick={() => navigate("/Forgot-password")}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>

      <style>
        {`
          .HSDlogin-page {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(90deg, #e2e2e2, rgba(6, 147, 133, 0.51));
            padding: 20px;
          }

          .HSDsignup-container {
            position: relative;
            width: 850px;
            height: 600px;
            background: #fff;
            border-radius: 30px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: row;
            overflow: hidden;
            margin: auto;
          }

          .HSDsignup-form {
            position: absolute;
            right: 0;
            width: 50%;
            height: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;
            text-align: center;
            padding: 20px;
            flex-direction: column;
            overflow-y: scroll;
            z-index: 1;
            max-height: 500px;
          }

          .HSDsignup-form::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }

          .HSDsignup-form {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .HSDsignup-form h2 {
            font-size: 30px;
            margin-bottom: 20px;
            margin-top: 30px;
            font-weight: bold;
          }

          .HSDinput-box {
            position: relative;
            margin-bottom: 1px;
            width: 100%;
          }

          .HSDinput-box input {
            width: 100%;
            max-width: 500px;
            padding: 16px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            background: #eee;
            color: #333;
            font-weight: 500;
            box-sizing: border-box;
          }

          .HSDinput-box input:focus {
            border-color: #7494ec;
            box-shadow: 0 0 8px rgba(116, 148, 236, 0.5);
          }

          .HSDinput-box input::placeholder {
            color: #888;
            font-weight: 400;
          }

          .HSDinput-box label {
            display: block;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .HSDsubmit {
            width: 100%;
            max-width: 300px;
            height: 50px;
            background: linear-gradient(to right, #5eeadb, #99f6ec);
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: none;
            cursor: pointer;
            font-size: 18px;
            color: #333;
            font-weight: 500;
            transition: 0.3s;
            margin-top: 30px;
            box-sizing: border-box;
          }

          .HSDsubmit:hover {
            background: linear-gradient(to right, #5eeadb, #99f6ec);
            box-shadow: 0 0 10px rgba(93, 234, 219, 0.3);
          }

          .HSDsubmit:active {
            transform: none;
            box-shadow: 0 0 10px rgba(93, 234, 219, 0.3);
          }

          .HSDtoggle-box {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .HSDtoggle-box::before {
            content: '';
            position: absolute;
            left: -250%;
            width: 300%;
            height: 100%;
            background: linear-gradient(90deg, #e2e2e2, rgba(6, 147, 133, 0.51)); 
            border-radius: 150px;
            z-index: 2;
          }

          .HSDtoggle-panel {
            position: absolute;
            width: 50%;
            height: 100%;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2;
          }

          .HSDtoggle-panel p {
            margin-bottom: 20px;
          }

          .HSDtoggle-panel .HSDbtn {
            width: 160px;
            height: 46px;
            background: transparent;
            box-shadow: none;
            border: 2px solid #fff;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
