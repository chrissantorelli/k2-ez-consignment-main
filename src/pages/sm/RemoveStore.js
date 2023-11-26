import React, { useState } from 'react';

export function RemoveStore() {
  const [storeName, setStoreName] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');

  function handleClick() {
    // Validation check
    if (!storeName) {
      setErrorMessages(['Please enter the name of the store to delete.']);
      return;
    }

    setErrorMessages([]);

    // Replace with your Lambda function's endpoint
    fetch('https://9k3oekmz8b.execute-api.us-east-1.amazonaws.com/initial/RemoveStore', {
      method: 'POST',
      body: JSON.stringify({ storename: storeName }), // Use "storename" as the key
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.body);
        alert(`Store '${storeName}' and related entries deleted successfully`);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessages([error.message]);
      });
  }

  return (
    <div className="container">
      <center>
        <h1>Delete Store</h1>
      </center>
      <form>
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
        <div className="error-message">
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="form-group">
          <button type="button" onClick={handleClick}>
            Delete Store
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
