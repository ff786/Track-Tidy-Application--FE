import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(false);

  const togglePanel = () => {
    setIsLoginActive(true);
    navigate("/"); // Navigate to login page
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "First name must be at least 2 characters").trim().required("First name is required"),
    lastName: Yup.string().min(2, "Last name must be at least 2 characters").trim().required("Last name is required"),
    email: Yup.string().email("Invalid email format").trim().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character")
      .required("Password is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .trim()
      .required("Mobile number is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch("http://localhost:8080/api/track-tidy/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Signup Successful! Redirecting to login...");
          // Passing the user data to login page
          navigate("/", { state: { userData: values } });
        } else {
          alert(`Signup Failed: ${data.message || "Something went wrong!"}`);
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Error signing up. Please check your network and try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="HSDlogin-page">
      <div className="HSDsignup-container">
        <div className="HSDtoggle-box">
          <div className="HSDtoggle-panel">
            <h1>Welcome!</h1>
            <h5>Already have an account?</h5>
            <button className="HSDbtn" onClick={togglePanel}>
              Login
            </button>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="HSDsignup-form">
          <h2>Create Your Account</h2>

          <div className="HSDinput-box">
            <label>First Name:</label>
            <input type="text" name="firstName" {...formik.getFieldProps("firstName")} placeholder="Enter your first name" />
            {formik.touched.firstName && formik.errors.firstName && <p className="error">{formik.errors.firstName}</p>}
          </div>

          <div className="HSDinput-box">
            <label>Last Name:</label>
            <input type="text" name="lastName" {...formik.getFieldProps("lastName")} placeholder="Enter your last name" />
            {formik.touched.lastName && formik.errors.lastName && <p className="error">{formik.errors.lastName}</p>}
          </div>

          <div className="HSDinput-box">
            <label>Email:</label>
            <input type="email" name="email" {...formik.getFieldProps("email")} placeholder="Enter your email" />
            {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}
          </div>

          <div className="HSDinput-box">
            <label>Password:</label>
            <input type="password" name="password" {...formik.getFieldProps("password")} placeholder="Enter a strong password" />
            {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}
          </div>

          <div className="HSDinput-box">
            <label>Mobile Number:</label>
            <input type="text" name="mobileNumber" {...formik.getFieldProps("mobileNumber")} placeholder="Enter 10-digit mobile number" />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && <p className="error">{formik.errors.mobileNumber}</p>}
          </div>

          <button type="submit" className="HSDsubmit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
