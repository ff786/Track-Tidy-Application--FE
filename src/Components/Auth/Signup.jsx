import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [showHint, setShowHint] = useState(false); // State for password hint visibility

  const togglePanel = () => {
    setIsLoginActive(true);
    navigate("/"); // Navigate to login page
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "First name must be at least 2 characters").trim().required("First name is required"),
    lastName: Yup.string().min(2, "Last name must be at least 2 characters").trim().required("Last name is required"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .trim()
      .required("Email is required"),
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
          // Save user data to localStorage for later use
          localStorage.setItem("registeredUser", JSON.stringify(values));

          alert("Signup Successful! Redirecting to login...");
          navigate("/", { state: { userData: values } }); // Pass user data to login page
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
          .HSDbody {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(90deg, #e2e2e2, rgba(6, 147, 133, 0.51)); 
            margin: 0;
          }
          .HSDsignup-container {
            position:relative;
            width: 850px;
            height: 600px;
            background: #fff;
            border-radius: 30px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
            display:flex;
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
          .HSDform {
            width: 100%;
            max-width: 600px;
          }
          .HSDinput-box {
            position: relative;
            margin-bottom: 1px;
            width: 100%;
          }
          .HSDinput-box input,
          .HSDinput-box select {
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
          .HSDinput-box input:focus,
          .HSDinput-box select:focus {
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
          .HSDinput-box i {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            color: #888;
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
            background:linear-gradient(90deg, #e2e2e2, rgba(6, 147, 133, 0.51));
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

          {/* Password Field with Hint */}
          <div className="HSDinput-box">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              placeholder="Enter a strong password"
              onFocus={() => setShowHint(true)}  // Show hint when input is focused
              onBlur={() => setShowHint(false)}  // Hide hint when input is blurred
            />

            {showHint && (
              <small>Password must be at least 8 characters with one uppercase letter, one number, and one special character.</small>
            )}

            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
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
