import React, { useState } from 'react';
import { useEffect } from 'react';

export function AddComputer() {
  // State variables for each form field
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

  // Dropdown options
  const graphicsOptions = ["NVIDIA GeForce RTX 4090", "NVIDIA GeForce RTX 4080", "AMD Radeon Pro W6300", "AMD Radeon Pro W6400", "Intel Integrated Graphics", "Intel UHD Graphics 730", "Intel UHD Graphics 770"];
  const memoryOptions = ["32 GB", "16 GB", "12 GB", "8 GB", "4GB", "1GB"];
  const processorOptions = ["Intel Xeon", "Intel i9", "Intel i7", "AMD Ryzen 9", "AMD Ryzen 7"];
  const processorGenOptions = ["13th Gen Intel", "12th Gen Intel", "11th Gen Intel", "AMD Ryzen 7000 Series", "AMD Ryzen 6000 Series"];
  const storageSizeOptions = ["2 TB", "1 TB", "512 GB", "256 GB", "128 GB"];

  // Function to generate a random ProductID
  function generateRandomProductId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const [storeNames, setStoreNames] = useState([]);

  // ... [existing code for dropdown options and generateRandomProductId function]

  // Function to fetch store names from API
  useEffect(() => {
    // Retrieve the username from local storage
    const username = localStorage.getItem('username'); // Replace 'username' with the actual key

    // Check if username exists
    if (!username) {
      console.error('Username not found in local storage');
      return;
    }

    // API request
    fetch('https://v9ka10czi7.execute-api.us-east-1.amazonaws.com/initial/GetStoresFromUserMattResource', {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
            // Parse the body string to JSON
            const storesData = JSON.parse(data.body);

            // Extract the StoreName values and set them to the storeNames state
            const stores = storesData.map(store => store.StoreName);
            setStoreNames(stores);
    })
    .catch(error => console.error('Error fetching store names:', error));
  }, []);

  // ... [existing code for handleClick function and form]





  // Function to handle the onClick event of the Add to Inventory button
  function handleClick() {
    // Construct the data object with the state values
    const data = {
      ProductID: generateRandomProductId(),
      ProductName: productName,
      Graphics: graphics,
      Memory: memory,
      Price: parseFloat(price),
      Processor: processor,
      ProcessorGen: processorGen,
      StorageSize: storageSize,
      StoreName: storeName,
    };

    // Validation check
    if (!productName || !graphics || !memory || !price || !processor || !processorGen || !storageSize || !storeName) {
      setErrorMessages(['Please fill in all fields.']);
      return;
    }

    setErrorMessages([]);

    // API request to add the computer to the inventory
    // Replace the URL with your actual API endpoint
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
      <center><h1>Add Computer to Inventory</h1></center>
      <form>
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
          <select id="graphics" value={graphics} onChange={(e) => setGraphics(e.target.value)} required>
            <option value="">Select Graphics</option>
            {graphicsOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="memory">Memory:</label>
          <select id="memory" value={memory} onChange={(e) => setMemory(e.target.value)} required>
            <option value="">Select Memory</option>
            {memoryOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
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
          <select id="processor" value={processor} onChange={(e) => setProcessor(e.target.value)} required>
            <option value="">Select Processor</option>
            {processorOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="processorGen">Processor Generation:</label>
          <select id="processorGen" value={processorGen} onChange={(e) => setProcessorGen(e.target.value)} required>
            <option value="">Select Processor Generation</option>
            {processorGenOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="storageSize">Storage Size:</label>
          <select id="storageSize" value={storageSize} onChange={(e) => setStorageSize(e.target.value)} required>
            <option value="">Select Storage Size</option>
            {storageSizeOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
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

        {/* Display error messages if any */}
        <div className="error-message">
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>

        {/* Add to Inventory button */}
        <div className="form-group">
          <button type="button" onClick={handleClick}>
            Add to Inventory
          </button>
        </div>
      </form>

      {/* Display the result message */}
      {result && (
        <div className="result-message">
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
}
