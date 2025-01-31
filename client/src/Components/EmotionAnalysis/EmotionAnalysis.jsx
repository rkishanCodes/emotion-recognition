import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./EmotionAnalysis.css";

const EmotionAnalysis = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const enableCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = videoStream;
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
        setCameraActive(true);
      }
    } catch (err) {
      setError("Error accessing camera: " + err.message);
      console.error("Error accessing camera:", err);
      setCameraActive(false);
    }
  };

  useEffect(() => {
    enableCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError("Video or canvas reference not available");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      setError("Video dimensions not available");
      return;
    }

    try {
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Failed to create image blob");
            return;
          }

          const file = new File([blob], "captured-image.jpg", {
            type: "image/jpeg",
          });

          const imageUrl = URL.createObjectURL(file);
          setImage(imageUrl);
          sendImageToBackend(file);

          URL.revokeObjectURL(imageUrl);
        },
        "image/jpeg",
        0.8
      );
    } catch (err) {
      setError("Error capturing image: " + err.message);
      console.error("Error in capture:", err);
    }
  };

  const sendImageToBackend = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/analyze_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000,
        }
      );

      if (response.data) {
        setResult(response.data);
      } else {
        throw new Error("Empty response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze image");
      console.error("Error sending image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setImage(null);
    setResult(null);
    setError(null);
    setLoading(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    await enableCamera();
  };

  return (
    <div className="emotion-container">
      <h1 className="emotion-title">Emotion Analysis</h1>

      {error && <div className="error-message">{error}</div>}

      {!image && (
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline className="video-feed" />
          <button
            onClick={captureImage}
            className="capture-button"
            disabled={loading || !cameraActive}
          >
            {loading ? "Processing..." : "Capture Image"}
          </button>
        </div>
      )}

      {image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="result-container"
        >
          <img src={image} alt="Captured" className="captured-image" />

          {loading && <p className="analyzing-text">Analyzing...</p>}

          {result && !error && (
            <div className="result-content">
              <h2>Results:</h2>
              <p>Dominant Emotion: <b>{result.dominant_emotion}</b></p>
              <p>Confidence: <b>{result.confidence.toFixed(2)}%</b></p>
              <h3>Emotion Breakdown:</h3>
              <div className="emotion-breakdown">
                {Object.entries(result.emotions).map(([emotion, score]) => (
                  <div key={emotion} className="emotion-item">
                    <span>{emotion}</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${score}%` }} />
                    </div>
                    <span>{score.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </motion.div>
      )}

      <canvas ref={canvasRef} className="hidden-canvas" />
    </div>
  );
};

export default EmotionAnalysis;
