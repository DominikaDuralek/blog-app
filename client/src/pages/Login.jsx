import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext.jsx';

function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  // Errors
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  // Detect changes in the inputs
  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async e => {
    // Prevent default after refreshing the page
    e.preventDefault();

    try {
      await axios.post("/api/auth/login", inputs);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="username" name='username' onChange={handleChange} />
        <input type="password" placeholder="password" name='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  );
}

export default Login;