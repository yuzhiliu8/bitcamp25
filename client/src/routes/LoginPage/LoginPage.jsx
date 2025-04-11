import React from 'react'
import './LoginPage.css'

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="logo">
          <span>MacroMaster</span>
        </div>

        <h2>Welcome back</h2>
        <p>Please enter your details</p>

        <form>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember for 30 days
            </label>
            <a href="#">Forgot password</a>
          </div>

          <button type="submit">Sign in</button>
        </form>

        <div className="signup-link">
          Don&apos;t have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
