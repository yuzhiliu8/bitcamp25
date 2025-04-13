import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {API_URL} from "../../util/Constants";
import './LogFood.css';

function LogFoodPage() {
  const navigate = useNavigate();
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [detectedItems, setDetectedItems] = useState([]); // State to store detected items and their details
  const [grams, setGrams] = useState({}); // Store grams for each item

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
      const formData = new FormData()
      formData.append('image',file)
      const response = await fetch(`${API_URL}/api/model/show-model`,{
        method:'POST',
        body: formData,
        credentials: "include",
      })
      const data = await response.json()
      console.log(data)
      // Here you would call your computer vision model to detect items
      // Simulating with a mock example of detected items
      // const detected = [
      //   { id: 1, name: 'Apple', calPerGram: 0.52, carbsPerGram: 0.14, proteinPerGram: 0.01, fatPerGram: 0.01 },
      //   { id: 2, name: 'Banana', calPerGram: 0.89, carbsPerGram: 0.23, proteinPerGram: 0.01, fatPerGram: 0.03 }
      // ];
      const detected = Object.entries(data).map(([name, values], index) => ({
        id: index + 1,
        name: name,
        calPerGram: values.cals_per_gram,
        carbsPerGram: values.carbs,
        proteinPerGram: values.protein,
        fatPerGram: values.fat
      }));
      setDetectedItems(detected); // Set the detected items
      console.log(detectedItems)
    }
  };

  const handleGramsChange = (id, value) => {
    setGrams(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    if (Object.keys(grams).length !== detectedItems.length) {
      alert("Please enter grams of each food.");
      return;
    }

    alert("Submitted.");
    console.log("Submitting image:", image);
    console.log("Grams data:", grams);
  };

  const handleDelete = () => {
    setImage(null);
    setPreview(null);
    setFileName('');
    setDetectedItems([]);
    setGrams({});
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

        {detectedItems.length > 0 && (
          <div className="item-form-container">
            {detectedItems.map(item => (
              <div key={item.id} className="item-form">
                <label>{item.name}</label>
                <input
                  type="number"
                  placeholder={`Enter grams of ${item.name}`}
                  onChange={(e) => handleGramsChange(item.id, e.target.value)}
                />
                <div className="nutritional-info">
                  <div className="cal-carb-row">
                    <span>Calories per gram: {item.calPerGram}</span>
                    <span>Carbs per gram: {item.carbsPerGram}</span>
                  </div>
                  <div className="protein-fat-row">
                    <span>Protein per gram: {item.proteinPerGram}</span>
                    <span>Fat per gram: {item.fatPerGram}</span>
                  </div>
                </div>
              </div>
            ))}
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