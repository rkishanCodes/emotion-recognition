import React, { useState } from "react";
import "./Aibooksuggestion.css";
import EmotionAnalysis from "../EmotionAnalysis/EmotionAnalysis";

const Aibooksuggestion = () => {
  const [showEmotionAnalysis, setShowEmotionAnalysis] = useState(false);

  const handleOpenPopup = () => {
    setShowEmotionAnalysis(true);
  };

  const handleClosePopup = () => {
    setShowEmotionAnalysis(false);
  };

  const handleRecommendationReceived = () => {
    setShowEmotionAnalysis(false); 
  };

  return (
    <div className="Aibooksuggestion">
      <div className="heading">
        <h1>Discover the Right Book for Your Emotions with AI</h1>
      </div>
      <div className="paragraph">
        <p>
          Every emotion has a story, and the right book can transform it. Our AI
          understands your feelings and recommends books to match your mood.
        </p>
        <p>
          <b>Lost?</b> Find clarity. <b>Anxious?</b> Embrace peace.{" "}
          <b>Motivated?</b> Fuel your ambition.
        </p>
        <p>Let AI be your guide to emotional well-being—one book at a time.</p>
        <div className="button">
          <button onClick={handleOpenPopup}>Discover Your Book Now!</button>
        </div>
      </div>

      {showEmotionAnalysis && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              ✖
            </button>
            <EmotionAnalysis onRecommendationReceived={handleRecommendationReceived} handleClosePopup={handleClosePopup}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aibooksuggestion;
