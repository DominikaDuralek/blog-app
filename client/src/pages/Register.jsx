import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  // Errors
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Detect changes in the inputs
  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async e => {
    // Prevent default after refreshing the page
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
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
        {error && <p>{error}</p>}
        <span>Do you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
}

export default Register;