import React, { useState } from 'react';
import '../../App.css';
import './Login.css';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleAuth = () => {
    setIsLogin(prevState => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login or signup here
    console.log("Email: ", email);
    console.log("Password: ", password);
    if (isLogin) {
      navigate('/dashboard');
    }
  };

  return (

    <div className="login-container">
      <div className="login-form">
        <div className="auth-toggle">
          <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <button onClick={toggleAuth}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>

        <div className="form-header">
          <h3>{isLogin ? "Welcome Back!" : "Create an Account"}</h3>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <MdEmail className="icon" />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <div className="input-container">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <BsFillShieldLockFill className="icon" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {isLogin && (
            <span className="forgot-password">
              Forgot your password? <Link to="/forgot-password">Click Here</Link>
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
