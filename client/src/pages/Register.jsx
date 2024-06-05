import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  // Detect changes in the inputs
  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async e => {
    // Prevent default after refreshing the page
    e.preventDefault();

    console.log("ok");

    try {
      const res = await axios.post("/api/auth/register", inputs);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="username" name='username' onChange={handleChange} />
        <input required type="text" placeholder="email" name='email' onChange={handleChange} />
        <input required type="password" placeholder="password" name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        <p>This is an error!</p>
        <span>Do you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
}

export default Register;