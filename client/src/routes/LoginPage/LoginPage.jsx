import React, { useState } from 'react';
import './LoginPage.css';
import full_logo from '../../assets/full_logo.png';
import { useNavigate } from 'react-router';
import { API_URL } from '../../util/Constants';

function LoginPage() {

  const [info, setInfo] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', info.email);
    formData.append('password', info.password);

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (response.status == 401) {
      console.error("Invalid username or password");
      window.alert("Invalid username or password");
    } else {
      const session = await response.json();
      console.log(session);
      navigate('/home');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="logo">
          <a href="https://www.youtube.com/watch?v=Ou7c8Sg9YVg">
            <img 
              src={full_logo} 
              alt="logo"
              style={{ width: '100%', maxWidth: '200px', height: 'auto' }} 
            />
          </a>
        </div>

        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />

          <div className="options" >
            <label>
              <input type="checkbox" />
              Remember for 30 days
            </label>
          </div>

          <button type="submit">Sign in</button>
        </form>

        <div className="signup-link" onClick={() => navigate('/signup')}>
          Don&apos;t have an account? <a>Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;