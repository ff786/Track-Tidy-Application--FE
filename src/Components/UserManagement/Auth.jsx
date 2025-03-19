import React, { useState } from "react";
import bcrypt from "bcryptjs";

const Auth = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    if (isLogin) {
      // LOGIN
      const user = users.find((u) => u.email === email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        alert("Invalid Credentials");
        return;
      }
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "/dashboard";
    } else {
      // REGISTER
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { name, email, password: hashedPassword, role: "Customer", lastLogin: new Date() };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Registration Successful! Please Login.");
      setIsLogin(true);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />}
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAuth}>{isLogin ? "Login" : "Register"}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "No account? Register" : "Already registered? Login"}
      </button>
    </div>
  );
};

export default Auth;
