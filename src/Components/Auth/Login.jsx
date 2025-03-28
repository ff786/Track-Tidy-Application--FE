import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Reuse the same styling

const Login = () => {
  const navigate = useNavigate();
  const [isSignupActive, setIsSignupActive] = useState(false);

  const togglePanel = () => {
    setIsSignupActive(!isSignupActive);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: " ",
      password: " ",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Login Data:", values);
      alert("Login Successful!");
      navigate("/dashboard");
    },
  });

  return (
    <div className={`signup-container ${isSignupActive ? "active" : ""}`}>
      <div className="toggle-box">
        <div className="toggle-panel">
          <h1>Welcome Back!</h1>
          <h5>Don't have an account?</h5>
          <button className="btn signup-btn" onClick={togglePanel}>
            Sign Up
          </button>
        </div>
      </div>
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
    {...formik.getFieldProps("password")}
    placeholder="Enter your password"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    style={{
      WebkitTextSecurity: formik.values.password ? "disc" : "none", // Hide text if entered
    }}
  />
  {formik.touched.password && formik.errors.password && (
    <p className="error">{formik.errors.password}</p>
  )}
</div>




        <button type="submit" className="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
