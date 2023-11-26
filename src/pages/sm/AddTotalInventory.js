import React, { useState } from 'react';

export function AddTotalInventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [errorMessages, setErrorMessages] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessages('');
    setInventoryData([]); // Clear previous data
    setLoading(true);

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
      setLoading(false);
    }
  };

  // Helper function to render table rows
  const renderTableRows = (data) => {
    return Object.entries(data).map(([store, total], index) => (
      <tr key={index}>
        <td>{store}</td>
        <td>{total}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <center>
        <h1>Add Total Inventory</h1>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Add Inventory Report'}
          </button>
        </div>
      </form>
      {errorMessages && <div className="error-message">{errorMessages}</div>}
      {/* Table to display the inventory data */}
      {!loading && inventoryData && (
        <table>
          <thead>
            <tr>
              <th>Store</th>
              <th>Total</th>
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
