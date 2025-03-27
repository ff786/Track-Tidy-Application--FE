import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(false);

  const togglePanel = () => {
    setIsLoginActive(!isLoginActive);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    role: Yup.string().required("Role is required"),
    vendorCompany: Yup.string().when("role", {
      is: "Vendor",
      then: Yup.string().required("Company name is required for vendors"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "",
      vendorCompany: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Signup Successful!");
      navigate("/login");
    },
  });

  return (
    <div className={`signup-container ${isLoginActive ? "active" : ""}`}>
      <div className="toggle-box">
        <div className="toggle-panel">
          <h1>Welcome!</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={togglePanel}>
            Login
          </button>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="signup-form">
        <h2>Create Your Account</h2>

        <div className="input-box">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            {...formik.getFieldProps("name")}
            placeholder="Enter your full name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>

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
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
            placeholder="Enter a strong password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div>

        <div className="input-box">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            {...formik.getFieldProps("phone")}
            placeholder="Enter 10-digit phone number"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="error">{formik.errors.phone}</p>
          )}
        </div>

        <div className="input-box">
          <label>Role:</label>
          <select name="role" {...formik.getFieldProps("role")}>
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Vendor">Vendor</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="error">{formik.errors.role}</p>
          )}
        </div>

        {formik.values.role === "Vendor" && (
          <div className="input-box">
            <label>Company Name:</label>
            <input
              type="text"
              name="vendorCompany"
              {...formik.getFieldProps("vendorCompany")}
              placeholder="Enter your company name"
            />
            {formik.touched.vendorCompany && formik.errors.vendorCompany && (
              <p className="error">{formik.errors.vendorCompany}</p>
            )}
          </div>
        )}

        <button type="submit" className="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
