import React, { useState } from "react";
import "./CategoryList.css";

const categories = [
  { name: "Fact Books", image: "/products/book1.png", title: "Fact Books" },
  { name: "Fantasy & Science", image: "/products/book3.png", title: "Fantasy & Science" },
  { name: "Humor and Feel", image: "/products/book2.png", title: "Humor and Feel" },
  { name: "Easy To Read", image: "/products/book1.png", title: "Har Kommer Ambulansen" },
  { name: "Reference Books", image: "/products/book2.png", title: "Reference Books" }
];

const CategoryList = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (event) => {
      const offsetX = 10; // Adjust this value to set how far the image is from the cursor
      const offsetY = 10; // Adjust this value to set how far the image is from the cursor
      setPosition({ x: event.clientX + offsetX, y: event.clientY + offsetY });
    };
  
    return (
      <div className="category-container">
        <ul className="category-list">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`category-item ${hoveredCategory === index ? "active" : ""}`}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              onMouseMove={handleMouseMove}
            >
              {category.name}
            </li>
          ))}
        </ul>
  
        {hoveredCategory !== null && categories[hoveredCategory].image && (
          <div
            className="hover-image"
            style={{
              top: `${position.y}px`,
              left: `${position.x}px`,
              position: "absolute",
              pointerEvents: "none",
            }}
          >
            <img src={categories[hoveredCategory].image} alt={categories[hoveredCategory].title} />
            <p>{categories[hoveredCategory].title}</p>
          </div>
        )}
      </div>
    );
  };
  
export default CategoryList;