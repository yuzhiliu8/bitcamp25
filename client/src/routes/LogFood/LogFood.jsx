import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './LogFood.css';

function LogFoodPage() {

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    alert("Submitted.");
    console.log("Submitting image:", image);
  };

  const handleDelete = () => {
    setImage(null);
    setPreview(null);
    setFileName('');
  };

  return (
    <div className="logfood-wrapper">
      <div className="logfood-box">
        <h2>Log Food</h2>
        <p>Upload a photo of your meal!</p>

        <label htmlFor="file-upload" className="file-upload-label">
          {fileName || 'No file chosen'}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button onClick={handleSubmit}>Submit</button>

        {preview && (
          <button className="delete-button" onClick={handleDelete}>Delete Image</button>
        )}
      </div>
      <button className="back-button" onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
};

export default LogFoodPage;
