import React, { useState, useEffect } from 'react';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

const thStyle = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
};

const tdStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '8px',
};

export function GenerateInventory() {
  const [storename, setStoreName] = useState('');
  const [storeOptions, setStoreOptions] = useState([]);
  const [inventoryReport, setInventoryReport] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');

    if (!username) {
      console.error('Username not found in local storage');
      return;
    }

    fetch('https://v9ka10czi7.execute-api.us-east-1.amazonaws.com/initial/GetStoresFromUserMattResource', {
      method: 'POST',
      body: JSON.stringify({ username: username }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      const stores = JSON.parse(data.body);
      setStoreOptions(stores.map(store => store.StoreName));
    })
    .catch(error => console.error('Error fetching store names:', error));
  }, []);

  const handleStoreNameChange = (e) => {
    const selectedStoreName = e.target.value;
    //console.log('Selected Store:', selectedStoreName);
    setStoreName(selectedStoreName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessages('');
    setLoading(true);
    setInventoryReport([]);
    console.log('Selected StoreHere :', storename);
    fetch('https://1v4atlcx2i.execute-api.us-east-1.amazonaws.com/initial/GetStoreInventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ storename }), // Ensure this matches the key expected by your Lambda
    })
    .then(response => response.json())
    .then(data => {
      if (data.statusCode === 200) {
        try {
          const bodyData = JSON.parse(data.body);
          if (bodyData.products && bodyData.products.length > 0) {
            setInventoryReport(bodyData.products);
          } else {
            setErrorMessages('No products found for the specified store.');
          }
        } catch (error) {
          setErrorMessages('Failed to parse inventory data. Please try again.');
        }
      } else {
        setErrorMessages(data.message || 'No products available for store');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessages('Failed to fetch inventory report. Please try again.');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <center><h1>Generate Inventory</h1></center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="storename">Store Name:</label>
          <select
            id="storename"
            name="storename"
            value={storename}
            onChange={handleStoreNameChange}
            required
          >
            <option value="">Select Store</option>
            {storeOptions.map((store, index) => (
              <option key={index} value={store}>{store}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Generate Inventory'}
          </button>
        </div>
      </form>

      {errorMessages && <div className="error-message">{errorMessages}</div>}

      <div className="inventory-report">
        <h2>Inventory Report for {storename}</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Graphics</th>
              <th style={thStyle}>Memory</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Processor</th>
              <th style={thStyle}>ProcessorGen</th>
              <th style={thStyle}>StorageSize</th>
            </tr>
          </thead>
          <tbody>
            {inventoryReport.length > 0 ? inventoryReport.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.ProductName}</td>
                <td style={tdStyle}>{item.Graphics}</td>
                <td style={tdStyle}>{item.Memory}</td>
                <td style={tdStyle}>${item.Price}</td>
                <td style={tdStyle}>{item.Processor}</td>
                <td style={tdStyle}>{item.ProcessorGen}</td>
                <td style={tdStyle}>{item.StorageSize}</td>
              </tr>
            )) : (
              <tr>
                <td style={tdStyle} colSpan="7">No products found for the specified store.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}