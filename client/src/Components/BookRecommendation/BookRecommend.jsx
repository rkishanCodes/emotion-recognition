import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import "./BookRecommend.css";

const BookRecommend = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const bookLinks = useSelector((state) => state.links);
  const header = useSelector((state) => state.header);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="container">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {header}
      </motion.h1>
      {loading ? (
        <motion.div
          className="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="spinner"></div>
        </motion.div>
      ) : (
        <motion.div
          className="book-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {bookLinks.length > 0 ? (
            bookLinks.map((link, index) => (
              <motion.div
                key={index}
                className="book-card"
                initial={{ opacity: 0, y: 50, scale: 1 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale:
                    hoveredIndex !== null && hoveredIndex !== index ? 0.95 : 1,
                }}
                whileHover={{ scale: 1.125 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                transition={{ duration: 0.2 }}
              >
                <div className="card-content">
                  <img
                    src={link}
                    alt={`Book ${index + 1}`}
                    className="book-image"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <p>No recommended books available.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BookRecommend;
