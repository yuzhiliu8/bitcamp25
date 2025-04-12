import React, { useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from 'react-router';
import { API_URL } from "../../util/Constants";

function SignUpPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        if (form.password !== form.confirmPassword) {
            alert("Please make sure your passwords match!");
            return;
        }

        const body = {
            email: form.email,
            password: form.password,
            first_name: form.firstName,
            last_name: form.lastName,
        }

        const response = await fetch(`${API_URL}/api/users/create-user`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 400) {
            console.error("email already used!");
            window.alert("email already used!");
            return;
        }

        const data = await response.json();
        console.log(data); 
        navigate("/login");
    };

    return (
    <div className="signup-wrapper">
        <div className="signup-box">
            <h2>Create an Account</h2>
                <p>Start tracking your calories and goals today!</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />
                    
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
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
