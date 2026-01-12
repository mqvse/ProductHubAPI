import React, { useEffect, useState } from 'react';
import api from '../api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. NEW STATE VARIABLES ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.log("API offline, using mock data");
        // --- MOCK DATA MATCHING YOUR REFERENCE IMAGE ---
        setProducts([
          {
            _id: '1',
            name: 'Sony WH-1000XM5',
            category: 'Electronics',
            price: 349.00,
            rating: 4.8,
            image: 'https://www.ourfriday.co.uk/image/cache/catalog/Sony/sony-wh-1000xm5-wireless-noise-cancelling-headphones-midnight-blue-1-800x800.jpg'
          },
          {
            _id: '2',
            name: 'MacBook Air M2',
            category: 'Electronics',
            price: 1199.00,
            rating: 5.0,
            image: 'https://m.media-amazon.com/images/I/710TJuHTMhL.jpg'
          },
          {
            _id: '3',
            name: 'Smart Lamp',
            category: 'Home & Garden',
            price: 45.00,
            rating: 4.2,
            image: 'https://m.media-amazon.com/images/I/6138AtN-n-L._AC_SL1500_.jpg'
          },
          {
            _id: '4',
            name: 'Ergonomic Chair',
            category: 'Home & Garden',
            price: 250.00,
            rating: 4.5,
            image: 'https://www.hbada.uk/cdn/shop/files/2_9e626992-cbb8-4b1d-9282-51a67e6f4124.jpg?w=500&auto=format&fit=crop&q=60'
          },
          {
            _id: '5',
            name: 'Canon DSLR',
            category: 'Electronics',
            price: 650.00,
            rating: 4.7,
            image: 'https://panamoz.com/media/catalog/product/cache/b0546a782ddd11420e3ffb7c5ce8736a/1/4/1472097112000_1274706_2nd.jpg?w=500&auto=format&fit=crop&q=60'
          },
          {
            _id: '7',
            name: 'Denim Jacket',
            category: 'Fashion',
            price: 89.00,
            rating: 4.3,
            image: 'https://thursdayboots.com/cdn/shop/products/1024x1024-Mens-Jackets-Denim-Trucker-WashedIndigo-010423-1.jpg?w=500&auto=format&fit=crop&q=60'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

// --- 3. FILTER LOGIC ---
  const filteredProducts = products.filter(product => {
    // A. Filter by Category
    const categoryMatch = selectedCategory === 'All Products' 
      || product.category === selectedCategory;

    // B. Filter by Search (Case Insensitive)
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      || product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">🛍️ ProductHub</div>
        <nav>
          {/* 4. DYNAMIC SIDEBAR BUTTONS */}
          {['All Products', 'Electronics', 'Fashion', 'Home & Garden'].map(cat => (
            <button 
              key={cat}
              className={`nav-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
          <button className="nav-btn">Settings</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="search-bar">
            <span role="img" aria-label="search">🔍</span>
            {/* 5. CONNECTED INPUT */}
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="user-profile">
            <span className="user-name">Guest User</span>
            <div className="avatar">G</div>
          </div>
        </header>

        <div className="hero-banner">
          <div>
            <h1>{selectedCategory === 'All Products' ? 'New Trending' : selectedCategory}</h1>
            <p>Best items selected for you</p>
            <button>Browse Collection</button>
          </div>
          <img src="https://placehold.co/300x300/EEE/31343C?text=Gadgets&font=roboto" alt="Tech" />
        </div>

        <h2>{searchTerm ? `Results for "${searchTerm}"` : 'Recommended Items'}</h2>
        
        <div className="product-grid">
          {/* 6. RENDER FILTERED LIST */}
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
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
            ))
          ) : (
            <div className="no-results">
              <h3>No products found 😔</h3>
              <p>Try adjusting your search or category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Products;