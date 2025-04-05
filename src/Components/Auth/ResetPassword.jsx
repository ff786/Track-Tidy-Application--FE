import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format. Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/track-tidy/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Reset link sent successfully! Check your email.");
        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      } else {
        setError(data.message || "Something went wrong. Try again.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  useEffect(() => {
    const button = document.querySelector("button");
    if (button) {
      button.addEventListener("mouseover", () => {
        button.style.boxShadow = "0 0 10px rgba(93, 234, 219, 0.3)";
      });
      button.addEventListener("mouseout", () => {
        button.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
      });
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>Enter your email address and we'll send you a password reset link.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>Send Reset Link</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isPasswordStrong = (pwd) => {
    return pwd.length >= 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isPasswordStrong(password)) {
      setError("Password must be at least 8 characters long, contain an uppercase letter and a number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      setMessage("✅ Your password has been successfully reset!");

      if (response.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <div style={{ marginBottom: "10px", alignSelf: "flex-start" }}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              /> Show Password
            </label>
          </div>
          <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(90deg, #e2e2e2, rgba(6, 147, 133, 0.51))",
  },
  formContainer: {
    width: "350px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    borderRadius: "30px",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  submitButton: {
    width: "100%",
    maxWidth: "300px",
    height: "50px",
    background: "linear-gradient(to right, #5eeadb, #99f6ec)",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "#333",
    fontWeight: "500",
    transition: "0.3s",
    marginTop: "20px",
    boxSizing: "border-box",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    color: "green",
  },
  error: {
    marginTop: "10px",
    fontSize: "14px",
    color: "red",
  },
};

export { ForgotPassword, ResetPassword };
