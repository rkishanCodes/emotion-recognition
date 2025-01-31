import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <>
    
    <div className="hero">
      <h1>B<span className="circle_container">O<span className="circle"></span></span></h1>
      <img src="/hero/Heroimg.png" alt="hero" />
      <h1>OK</h1>
    </div>
     <div className="line_container">
        <span className="line1"></span>
        <span className="line2"></span>
      </div>
    </>
  );
};

export default Hero;
