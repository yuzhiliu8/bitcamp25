import React from 'react'
import './LoginPage.css'
import full_logo from '../../assets/full_logo.png'

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="logo">
            <a href="https://www.youtube.com/watch?v=Ou7c8Sg9YVg" target="_blank"><img 
            src={full_logo} 
            alt="image"
            style={{ width: '100%', maxWidth: '200px', height: 'auto' }} 

            />
            </a>
        </div>

        <h2>Sign In</h2>

        <form>
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember for 30 days
            </label>
            <a href="#">Forgot password?</a>
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
