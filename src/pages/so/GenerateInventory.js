import React, { useState } from 'react';

// CSS styles for the table
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
  const [inventoryReport, setInventoryReport] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessages('');
    setLoading(true);
    setInventoryReport([]);

    // Replace with your API Gateway URL
    fetch('https://1v4atlcx2i.execute-api.us-east-1.amazonaws.com/initial/GetStoreInventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ storename }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
          setErrorMessages(data.message || 'Invalid store name. Please check and try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessages('Failed to fetch inventory report. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <center>
        <h1>Generate Inventory</h1>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="storename">Store Name:</label>
          <input
            type="text"
            id="storename"
            name="storename"
            value={storename}
            onChange={(e) => setStoreName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Generate Inventory'}
          </button>
        </div>
      </form>
      {errorMessages && <div className="error-message">{errorMessages}</div>}
      {inventoryReport.length > 0 && (
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
              {inventoryReport.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{item.ProductName}</td>
                  <td style={tdStyle}>{item.Graphics}</td>
                  <td style={tdStyle}>{item.Memory}</td>
                  <td style={tdStyle}>${item.Price}</td>
                  <td style={tdStyle}>{item.Processor}</td>
                  <td style={tdStyle}>{item.ProcessorGen}</td>
                  <td style={tdStyle}>{item.StorageSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
