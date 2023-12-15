import React, { useState, useEffect } from 'react';

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

export function AddTotalInventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const fetchInventoryData = async () => {
      setErrorMessages('');
      try {
        const response = await fetch('https://3lwh7srekg.execute-api.us-east-1.amazonaws.com/initial/AddTotalInventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Sending an empty object as requested
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.statusCode === 200) {
          // Assuming the body is already in JSON format or needs parsing like JSON.parse(data.body)
          setInventoryData(JSON.parse(data.body));
        } else {
          throw new Error(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessages('Failed to fetch inventory report: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchInventoryData(); // Call the fetchInventoryData function when the component mounts
  }, []);

  // Helper function to render table rows with "$" sign for totals
  const renderTableRows = (data) => {
    return Object.entries(data).map(([store, total], index) => (
      <tr key={index}>
        <td style={tdStyle}>{store}</td>
        <td style={tdStyle}>${total.toFixed(2)}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <center>
        <h1>Report Total Inventory $$ Amount in Entire Site</h1>
      </center>
      {errorMessages && <div className="error-message">{errorMessages}</div>}
      {/* Table to display the inventory data */}
      {!loading && inventoryData && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Store</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows(inventoryData)}
          </tbody>
        </table>
      )}
    </div>
  );
}
