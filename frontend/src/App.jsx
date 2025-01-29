import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Emotion Analysis</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!image && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="mb-4 rounded-lg w-full max-w-lg"
          />
          <button
            onClick={captureImage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
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
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        >
          <img src={image} alt="Captured" className="mb-4 rounded-lg w-full" />

          {loading && (
            <div className="text-center text-gray-600">
              <p>Analyzing...</p>
            </div>
          )}

          {result && !error && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Results:</h2>
              <p className="text-gray-600">
                Dominant Emotion:{" "}
                <span className="font-bold">{result.dominant_emotion}</span>
              </p>
              <p className="text-gray-600">
                Confidence:{" "}
                <span className="font-bold">
                  {result.confidence.toFixed(2)}%
                </span>
              </p>

              <div>
                <h3 className="text-lg font-bold mb-2">Emotion Breakdown:</h3>
                <div className="space-y-2">
                  {Object.entries(result.emotions).map(([emotion, score]) => (
                    <div
                      key={emotion}
                      className="flex justify-between items-center"
                    >
                      <span className="capitalize">{emotion}</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="w-16 text-right">
                          {score.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleRetry}
            className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </motion.div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export default App;
