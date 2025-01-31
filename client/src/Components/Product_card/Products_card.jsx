import React from 'react';
import './Products_card.css';

const Products_card = ({ product_name, product_image, color }) => {
  return (
    <div className="product_card">
      <img src={product_image} alt={product_name} />
      <div className="product_text">
        <span style={{ backgroundColor: color }}></span>
        <h1>{product_name}</h1>
      </div>
    </div>
  );
};

export default Products_card;
