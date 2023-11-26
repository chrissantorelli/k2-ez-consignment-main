import React, { useState } from 'react';

export function CreateStore() {
  const [storeID, setStoreID] = useState('');
  const [storeName, setStoreName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');

  function generateRandomStoreID() {
    // Generate a random integer between 1 and 1000000 (adjust the range as needed)
    return Math.floor(Math.random() * 1000000) + 1;
  }

  function handleClick() {
    const generatedStoreID = generateRandomStoreID();

    const data = {
      uid: generatedStoreID,
      storename: storeName,
      lat: latitude,
      lon: longitude,
    };
// these have to match the var names in your lambda
    //console.log(data);

    // Validation checks can go here
    if (!storeName || !latitude || !longitude) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }

    setErrorMessages([]);

    // Replace with your Lambda function's endpoint and update the path accordingly
    fetch('https://bd3ubjpoh2.execute-api.us-east-1.amazonaws.com/initial/CreateStore', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.body);
        setResult(data.body);
        alert('Store added successfully');
      })
      .catch((error) => {
        //console.error('Error:', error);
        setErrorMessages([error.message]);
      });
  }

  return (
    <div className="container">
      <center>
        <h1>Create Store</h1>
      </center>
      <form>
        {/* ... other form fields ... */}
        <div className="form-group">
          <label htmlFor="storeName">Store Name:</label>
          <input
            type="text"
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div className="error-message">
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="form-group">
          <button type="button" onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
      {result && (
        <div className="result-message">
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
}
