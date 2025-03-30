import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";


const EditUserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.user;

  const [user, setUser] = useState(userData || {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    role: "",
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "First name must be at least 2 characters").trim().required("First name is required"),
    lastName: Yup.string().min(2, "Last name must be at least 2 characters").trim().required("Last name is required"),
    email: Yup.string().email("Invalid email format").trim().required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .trim()
      .required("Mobile number is required"),
    role: Yup.string().required("Role selection is required"),
  });

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(`http://localhost:8080/api/track-tidy/user/${userData?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          alert("User details updated successfully!");
          navigate("/user-management");
        } else {
          alert(`Update Failed: ${data.message || "Something went wrong!"}`);
        }
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Error updating user details. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (userData) {
      setUser(userData); // Pre-fill user data if available
    }
  }, [userData]);

  return (
    <div className="HSDlogin-page">
      <div className="HSDsignup-container">
        {/* Toggle Panel */}
        <div className="HSDtoggle-box">
          <div className="HSDtoggle-panel">
            <h1>Edit User</h1>
            <h5>Update your account details</h5>
          </div>
        </div>

        {/* Edit User Form */}
        <form onSubmit={formik.handleSubmit} className="HSDsignup-form">
          <h2>Edit User Account</h2>

          <div className="HSDinput-box">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              {...formik.getFieldProps("firstName")}
              placeholder="Enter your first name"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="error">{formik.errors.firstName}</p>
            )}
          </div>

          <div className="HSDinput-box">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              {...formik.getFieldProps("lastName")}
              placeholder="Enter your last name"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="error">{formik.errors.lastName}</p>
            )}
          </div>

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
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              {...formik.getFieldProps("mobileNumber")}
              placeholder="Enter 10-digit mobile number"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <p className="error">{formik.errors.mobileNumber}</p>
            )}
          </div>

          <div className="HSDinput-box">
            <label>Role:</label>
            <select name="role" {...formik.getFieldProps("role")}>
              <option value="" label="Select your role" />
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="error">{formik.errors.role}</p>
            )}
          </div>

          <button type="submit" className="HSDsubmit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/user-management")}
            className="HSDcancel-btn"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
