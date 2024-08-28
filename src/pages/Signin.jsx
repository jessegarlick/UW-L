import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Signin.css";

function Signin() {
    const [username, setUsername] = useState('jgarlick');
    const [password, setPassword] = useState('passwordJesse');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }

      try {
        console.log('Form data being sent:', { username, password });
        const response = await axios.post('/api/login', { username, password });

        if (response.data) {
          dispatch({
            type: 'USER_AUTH',
            payload: {
              username: response.data.username,
              role: response.data.role,
              permissions: [], // Define permissions based on the role if needed
            },
          });

          navigate('/admin');
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        console.error('Error details:', error.response?.data);
        setError('An error occurred during login. Please try again.');
      }
    };

    return (
      <div className="signin-container">
        <div className="signin-form">
          <h2>Sign In</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      </div>
    );
}

export default Signin;
