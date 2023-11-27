import React, { useState } from 'react';

export function RemoveProduct() {
  const [productId, setProductId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');

  function handleClick() {
    // Validation check
    if (!productId || !storeName) {
      setErrorMessages(['Please enter both Product ID and Store Name.']);
      return;
    }

    setErrorMessages([]);

    // Replace with your API endpoint
    fetch('https://wnbslpmt71.execute-api.us-east-1.amazonaws.com/removeproductstage/removeproductresource', {
      method: 'POST',
      body: JSON.stringify({ ProductID: productId, StoreName: storeName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.body);
        alert(`Product '${productId}' from store '${storeName}' removed successfully`);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessages([error.message]);
      });
  }

  return (
    <div className="container">
      <center>
        <h1>Remove Product</h1>
      </center>
      <form>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
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
            Remove Product
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
