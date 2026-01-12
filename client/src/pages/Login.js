import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import './Form.css';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Login failed!');
    }
  };

  // --- NEW: Guest Mode Function ---
  const handleGuestLogin = () => {
    const mockToken = 'guest-token-123';
    setToken(mockToken);
    localStorage.setItem('token', mockToken);
    navigate('/products');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit">Sign In</button>
        
        {/* New Guest Button */}
        <button 
          type="button" 
          onClick={handleGuestLogin} 
          className="guest-btn"
        >
          View Demo (No Login Required)
        </button>
      </form>
      
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;