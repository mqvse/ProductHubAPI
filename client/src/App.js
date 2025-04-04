// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart, setCart] = useState([]);
  

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };


  return (
    <Router>
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/products" : "/login"} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />

        {token ? (
          <>
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart || []} />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/products" />} />
          </>
        ) : (
          <>
            <Route path="/products/*" element={<Navigate to="/login" />} />
            <Route path="/cart" element={<Navigate to="/login" />} />
            <Route path="/user-profile" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
