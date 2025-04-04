import React, { useEffect, useState } from 'react';
import api from '../api';
import './Products.css';
import { Link, useNavigate } from 'react-router-dom';


function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error('❌ Failed to load products:', err);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <div className="products-page"><h2>No products found 😢</h2></div>;
  }

  return (
    <div className="products-page">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <Link to={`/products/${p.id}`}>
              <img src={p.image_url} alt={p.name} />
            </Link>
            <div className="product-content">
              <h3>{p.name}</h3>
              <p>£{p.price}</p>
              <span>Stock: {p.stock}</span>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
