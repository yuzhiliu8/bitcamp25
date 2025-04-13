import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './LogFood.css';

function LogFoodPage() {

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(''); // State to track the file name for input label

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name); // Update the file name when a file is chosen
    }
  };

  const handleSubmit = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    alert("Image submitted to AI model!");
    console.log("Submitting image:", image);
  };

  const handleDelete = () => {
    setImage(null);
    setPreview(null); // Clears the preview
    setFileName(''); // Clears the file name, resetting the file input label
  };

  return (
    <div className="logfood-wrapper">
      <div className="logfood-box">
        <h2>Log Food</h2>
        <p>Upload a photo of your meal!</p>

        <label htmlFor="file-upload" className="file-upload-label">
          {fileName || 'No file chosen'} {/* Display file name or default text */}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Hide the default file input
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

        <button className="back-button" onClick={() => navigate("/home")}>Back to Home</button>
      </div>
    </div>
  );
};

export default LogFoodPage;
