import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav_container'>
        <ul>
            <li>Books</li>
            <li>Writer</li>
            <li>Articles</li>
            <li>Characters</li>
        </ul>
      </div>
      <div className='logo'>
        <img src="/logo.png" alt="logo" />
      </div>
      <div className='nav_container'>
        <ul>
            <li>Contact us</li>
            <li>Cart</li>
            <li>Search</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
