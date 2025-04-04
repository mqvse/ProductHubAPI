import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Form.css';

function Register({ setToken }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profile_image, setProfileImage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password, username, profile_image,});
      const loginRes = await api.post('/auth/login', { username, password });
      setToken(loginRes.data.token);
      localStorage.setItem('token', loginRes.data.token);
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Registration failed!');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <input type="text" placeholder="Profile Image URL" value={profile_image} onChange={(e) => setProfileImage(e.target.value)} required/>


        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
