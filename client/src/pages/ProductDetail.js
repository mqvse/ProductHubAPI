// src/pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './ProductDetail.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    }

    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${id}/reviews`, {
        rating: newRating,
        comment: newReview,
      });
      setNewReview('');
      setNewRating(5);

      const res = await api.get(`/products/${id}`);
      setProduct(res.data); // refresh product data
    } catch (err) {
      console.error('Review submission failed', err);
    }
  };

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
      setAddedToCart(true);
      setProduct((prev) => ({ ...prev, stock: prev.stock - 1 }));
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.image_url} alt={product.name} />
      <div className="details">
        <h2>{product.name}</h2>
        <p><strong>Category:</strong> {product.category_name}</p>
        <p><strong>Price:</strong> £{product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p className="description"><strong>Description:</strong> {product.description}</p>
        <button onClick={handleAddToCart}>
          Add to Cart
        </button>
        {addedToCart && <div className="bubble">Added to Cart!</div>}
      </div>

      <div className="reviews">
        <h3>Customer Reviews</h3>
        {product.reviews.length === 0 ? <p>No reviews yet.</p> :
          product.reviews.map((r, i) => (
            <div key={i} className="review">
              <strong>{r.reviewer_name || 'Anonymous'}:</strong>
              <span>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              <p>{r.comment}</p>
            </div>
          ))
        }

        <form onSubmit={handleReviewSubmit} className="review-form">
          <h4>Leave a Review</h4>
          <label>
            Rating:
            <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ProductDetail;
