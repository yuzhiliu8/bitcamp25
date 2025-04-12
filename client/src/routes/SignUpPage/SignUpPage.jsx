import React, { useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from 'react-router';

function SignUpPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Please make sure your passwords match!");
            return;}
        else {
            navigate('/home')
        }
    };

    return (
    <div className="signup-wrapper">
        <div className="signup-box">
            <h2>Create an Account</h2>
                <p>Start tracking your calories and goals today!</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                
                        <input
                            type="password"
                            name="password" 
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                
                        <button type="submit">Sign Up</button>
                    </form>

        <div className="login-link" onClick={() => navigate('/login')}>
          Already have an account? <a>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
