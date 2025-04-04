import React, { useState } from 'react';
import api from '../api';
import './AddProduct.css';

function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', stock: '', category_id: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Product added!');
      setForm({ name: '', price: '', stock: '', category_id: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input type="number" step="0.01" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <input type="number" name="category_id" placeholder="Category ID" value={form.category_id} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
