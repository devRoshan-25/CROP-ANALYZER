import React, { useState } from "react";
import "./App.css"; // Import the CSS file

const CropHealthChecker = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image");

    try {
      setLoading(true);
      const base64Image = await convertImageToBase64(image);
      const geminiAnalysis = await callGeminiAPI(base64Image);
      setResult(geminiAnalysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze crop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const callGeminiAPI = async (base64Image) => {
    const API_KEY = "API_KEY"; // Replace with your API key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Analyze the crop image and tell me if it looks healthy or if it shows signs of disease or stress. 
              If you see any issues, describe them. Also, provide any recommendations for treatment or care.`,
            },
            {
              inlineData: {
                mimeType: "image/jpeg", // Adjust if needed
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();

    let analysisText = "No analysis found.";
    if (data.candidates && data.candidates.length > 0 &&
      data.candidates[0].content && data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0 && data.candidates[0].content.parts[0].text) {
      analysisText = data.candidates[0].content.parts[0].text;
    } else {
      analysisText = JSON.stringify(data)
    }

    return analysisText;
  };

  return (
    <div className="crop-checker-container">
      <h1 className="crop-checker-title">🌿 Crop Health Checker</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="crop-checker-input"
      />

      {image && (
        <div className="image-preview">
          <img src={URL.createObjectURL(image)} alt="Crop Preview" />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="crop-checker-button"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Crop"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result-container">
          <h2 className="result-title">Analysis:</h2>
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
};

export default CropHealthChecker;