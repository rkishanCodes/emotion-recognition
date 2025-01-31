import React from "react";
import "./Whychoose.css";

const whychoose = () => {
  return (
    <div className="whycoose">
      <div className="heading">
        <h1>Why Choose Us?</h1>
      </div>
      <div className="para">
        <p>
          Our <b>Emotion Detection API</b> leverages the <b>DeepFace</b> library and the
          powerful <b>VGG-Face</b> model to analyze facial expressions and detect
          emotions like <b>happiness, sadness, anger,</b> and more. By using advanced
          deep learning techniques, this API offers real-time emotion analysis
          from uploaded images, providing detailed insights into the <b> dominant
          emotion</b> along with its confidence level. With support for flexible
         <b> detector_backends</b> like <b>OpenCV</b>, our system ensures accurate and
          reliable emotion recognition, making it easy to integrate into web or
          mobile applications for personalized, emotion-driven experiences.
        </p>
      </div>
    </div>
  );
};

export default whychoose;
