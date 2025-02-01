import React from "react";
import "./Navbar.css";
import { ShoppingCart ,Search} from "lucide-react";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav_container">
        <ul>
          <li>Books</li>
          <li>Writer</li>
          <li>Articles</li>
          <li>Characters</li>
        </ul>
      </div>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="nav_container">
        <ul>
          <li>Contact us</li>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap:".5rem"
            }}
          >
            Cart
            <ShoppingCart size={18} />
          </li>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap:".5rem"
            }}
          >
            Search
            <Search size={18} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
