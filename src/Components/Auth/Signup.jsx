import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import your CSS file for styling

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // Track selected role

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character")
      .required("Password is required"),
    role: Yup.string().required("Role is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    vendorCompany: Yup.string().when("role", {
      is: "Vendor",
      then: Yup.string().required("Company name is required for vendors"),
    }),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      phone: "",
      vendorCompany: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Data:", values);
      alert("Signup Successful!");
      navigate("/login"); // Redirect after successful signup
    },
  });

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      <form onSubmit={formik.handleSubmit} className="signup-form">
        {/* Name Field */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your full name"
        />
        {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}

        {/* Email Field */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}

        {/* Password Field */}
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter a strong password"
        />
        {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}

        {/* Phone Number */}
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter 10-digit phone number"
        />
        {formik.touched.phone && formik.errors.phone && <p className="error">{formik.errors.phone}</p>}

        {/* Role Selection */}
        <label>Role:</label>
        <select
          name="role"
          value={formik.values.role}
          onChange={(e) => {
            setRole(e.target.value); // Update role state
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Role</option>
          <option value="User">User</option>
          <option value="Vendor">Vendor</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
        {formik.touched.role && formik.errors.role && <p className="error">{formik.errors.role}</p>}

        {/* Vendor Company Field (Only for Vendors) */}
        {role === "Vendor" && (
          <>
            <label>Company Name:</label>
            <input
              type="text"
              name="vendorCompany"
              value={formik.values.vendorCompany}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your company name"
            />
            {formik.touched.vendorCompany && formik.errors.vendorCompany && (
              <p className="error">{formik.errors.vendorCompany}</p>
            )}
          </>
        )}

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>

      {/* Login Link */}
      <div className="login-link">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
