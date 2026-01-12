import React, { useEffect, useState } from 'react';
import api from '../api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.log("API offline, using modern mock data");
        // --- MOCK DATA MATCHING YOUR REFERENCE IMAGE ---
        setProducts([
          {
            _id: '1',
            name: 'Sony WH-1000XM5',
            category: 'Audio',
            price: 349.00,
            rating: 4.8,
            image: 'https://www.ourfriday.co.uk/image/cache/catalog/Sony/sony-wh-1000xm5-wireless-noise-cancelling-headphones-midnight-blue-1-800x800.jpg'
          },
          {
            _id: '2',
            name: 'MacBook Air M2',
            category: 'Laptops',
            price: 1199.00,
            rating: 5.0,
            image: 'https://m.media-amazon.com/images/I/710TJuHTMhL.jpg'
          },
          {
            _id: '3',
            name: 'Smart Lamp',
            category: 'Home',
            price: 45.00,
            rating: 4.2,
            image: 'https://m.media-amazon.com/images/I/6138AtN-n-L._AC_SL1500_.jpg'
          },
          {
            _id: '4',
            name: 'Ergonomic Chair',
            category: 'Furniture',
            price: 250.00,
            rating: 4.5,
            image: 'https://www.hbada.uk/cdn/shop/files/2_9e626992-cbb8-4b1d-9282-51a67e6f4124.jpg?w=500&auto=format&fit=crop&q=60'
          },
          {
            _id: '5',
            name: 'Canon DSLR',
            category: 'Photography',
            price: 650.00,
            rating: 4.7,
            image: 'https://panamoz.com/media/catalog/product/cache/b0546a782ddd11420e3ffb7c5ce8736a/1/4/1472097112000_1274706_2nd.jpg?w=500&auto=format&fit=crop&q=60'
          },
          {
            _id: '6',
            name: 'Mechanical Keyboard',
            category: 'Accessories',
            price: 120.00,
            rating: 4.6,
            image: 'https://customkeyboardsuk.co.uk/cdn/shop/files/CMK-01_IMG_04.jpg?w=500&auto=format&fit=crop&q=60'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      {/* 1. Sidebar (Static for Demo) */}
      <aside className="sidebar">
        <div className="logo">🛍️ ProductHub</div>
        <nav>
          <a href="#" className="active">All Products</a>
          <a href="#">Electronics</a>
          <a href="#">Fashion</a>
          <a href="#">Home & Garden</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      {/* 2. Main Content Area */}
      <main className="main-content">
        {/* Header */}
        <header className="top-bar">
          <div className="search-bar">
            <span role="img" aria-label="search">🔍</span>
            <input type="text" placeholder="Search for products..." />
          </div>
          <div className="user-profile">
            <span className="user-name">Guest User</span>
            <div className="avatar">G</div>
          </div>
        </header>

        {/* Hero / Banner Area */}
        <div className="hero-banner">
          <div>
            <h1>New Trending</h1>
            <p>Electronic Items & Gadgets</p>
            <button>Browse Collection</button>
          </div>
          <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60" alt="Tech" />
        </div>

        {/* Product Grid */}
        <h2>Recommended Items</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="modern-card">
              <div className="image-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="card-details">
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="rating">{'⭐'.repeat(Math.round(product.rating))}</div>
                <div className="bottom-row">
                  <span className="price">€{product.price.toFixed(2)}</span>
                  <button className="add-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Products;