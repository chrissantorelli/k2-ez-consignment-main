import React, { useState } from 'react';

export function ModifyPrice() {
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');

  function handleClick() {
    // Validation checks
    if (!productId) {
      setErrorMessages(['Please enter the Product ID.']);
      return;
    }
    if (!newPrice) {
      setErrorMessages(['Please enter the new price.']);
      return;
    }

    setErrorMessages([]);

    // Replace with your Lambda function's endpoint
    fetch('https://sk9zhtxtfh.execute-api.us-east-1.amazonaws.com/initial/modifyprice', {
      method: 'POST',
      body: JSON.stringify({ ProductID: productId, NewPrice: newPrice }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.body);
        alert(`Price for product with ProductID '${productId}' updated successfully to '${newPrice}'.`);
      })
      .catch((error) => {
        alert('Error updating product price');
      });
  }

  return (
    <div className="container">
      <center>
        <h1>Modfiy Price</h1>
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
          <label htmlFor="newPrice">New Price:</label>
          <input
            type="text"
            id="newPrice"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
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
            Update Price
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
