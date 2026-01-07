import React, { useState } from "react";
import './Login.css';

const API_KEY = "AIzaSyB0e7Z_UOBldjUY0i1y3N4i8t_odTfBaog";

const Login = ({goToSignup,onLoginSuccess}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      // ✅ STORE TOKEN
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", data.email);
      onLoginSuccess();

     
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
    <form onSubmit={loginHandler} className="card">
      <h2>Login</h2>

      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      {error && <p className="error">{error}</p>}

      <button disabled={!email || !password}>Login</button>

      <p className="linkp">Forgot Password</p>

      <p className="link" onClick={goToSignup}>
        Don’t have an account? Sign up
      </p>
    </form>
    </div>
  );
};

export default Login;
