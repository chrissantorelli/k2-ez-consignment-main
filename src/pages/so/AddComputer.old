import React, { useState } from 'react';

export function AddComputer() {
  const [productName, setProductName] = useState('');
  const [graphics, setGraphics] = useState('');
  const [memory, setMemory] = useState('');
  const [price, setPrice] = useState('');
  const [processor, setProcessor] = useState('');
  const [processorGen, setProcessorGen] = useState('');
  const [storageSize, setStorageSize] = useState('');
  const [storeName, setStoreName] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');

  function generateRandomProductId() {
    // Generate a random ProductID (for example, between 1000 and 9999)
    return Math.floor(1000 + Math.random() * 9000);
  }

  function handleClick() {
    const data = {
      ProductID: generateRandomProductId(), // Generate a random ProductID
      ProductName: productName,
      Graphics: graphics,
      Memory: memory,
      Price: parseFloat(price), // Parse the price as a float
      Processor: processor,
      ProcessorGen: processorGen,
      StorageSize: storageSize,
      StoreName: storeName, // Allow user to specify the StoreName
    };

    // Simple validation check
    if (!productName || !graphics || !memory || !price || !processor || !processorGen || !storageSize || !storeName) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }

    setErrorMessages([]);

    // Replace with your Lambda function's endpoint and update the path accordingly
    fetch('https://ew52oymdkd.execute-api.us-east-1.amazonaws.com/initial/AddComputer', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.body);
        alert('Computer added successfully to inventory');
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessages([error.message]);
      });
  }

  return (
    <div className="container">
      <center>
        <h1>Add Computer to Inventory</h1>
      </center>
      <form>
        {/* Form fields for user input */}
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="graphics">Graphics:</label>
          <input
            type="text"
            id="graphics"
            value={graphics}
            onChange={(e) => setGraphics(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="memory">Memory:</label>
          <input
            type="text"
            id="memory"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="processor">Processor:</label>
          <input
            type="text"
            id="processor"
            value={processor}
            onChange={(e) => setProcessor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="processorGen">Processor Generation:</label>
          <input
            type="text"
            id="processorGen"
            value={processorGen}
            onChange={(e) => setProcessorGen(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="storageSize">Storage Size:</label>
          <input
            type="text"
            id="storageSize"
            value={storageSize}
            onChange={(e) => setStorageSize(e.target.value)}
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
        {/* Error messages */}
        <div className="error-message">
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        {/* Submit button */}
        <div className="form-group">
          <button type="button" onClick={handleClick}>
            Add to Inventory
          </button>
        </div>
      </form>
      {/* Result message */}
      {result && (
        <div className="result-message">
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
}
