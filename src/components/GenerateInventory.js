import React, { useState, useEffect } from 'react';

// CSS styles for the table (same as in GenerateInventory component)
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

export function InventoryReport({ storename, onClose }) {
  const [inventoryReport, setInventoryReport] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch inventory data based on the storename
    fetch('https://1v4atlcx2i.execute-api.us-east-1.amazonaws.com/initial/GetStoreInventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ storename }),
    })
      .then((response) => response.json())
      .then((data) => {
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
  }, [storename]);

  return (
    <div className="container">
      <h2>Inventory Report for {storename}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {errorMessages && <div className="error-message">{errorMessages}</div>}
          {inventoryReport.length > 0 ? (
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
          ) : (
            <p>No inventory data available.</p>
          )}
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  );
}
