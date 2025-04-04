import React from 'react';
import './Cart.css';

function Cart({ cart }) {
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <p>Your cart is currently empty.</p>
      </div>
    );
  }

  const total = cart.reduce((acc, product) => acc + Number(product.price), 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price (£)</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{Number(product.price).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>£{total}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
