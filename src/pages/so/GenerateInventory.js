import React, { useState } from 'react';

function createTableFromJson(jsonString) {
    // Parse the JSON string to an object
    const data = JSON.parse(jsonString);
  
    // Create a table element
    const table = document.createElement("table");
  
    // Create a table header row
    const headerRow = table.insertRow(0);
  
    // Extract column headers from the first product
    const headers = Object.keys(data.products[0]);
  
    // Create header cells
    headers.forEach((headerText, index) => {
      const headerCell = document.createElement("th");
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });
  
    // Create table body rows
    data.products.forEach((product) => {
      const row = table.insertRow();
  
      // Populate the row with product data
      headers.forEach((header) => {
        const cell = row.insertCell();
        cell.textContent = product[header];
      });
    });
  
    // Append the table to the body of the document or any other container
    document.body.appendChild(table);
  }


export function GenerateInventory() {
  const [storename, setStoreName] = useState('');
  const [inventoryReport, setInventoryReport] = useState(null);
  const [errorMessages, setErrorMessages] = useState('');
  const [loading, setLoading] = useState(false);


  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessages('');
    setLoading(true);
    setInventoryReport(null);

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
          setInventoryReport(data.inventory);
          createTableFromJson(data.body);
        } else {
          setErrorMessages(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessages('Failed to fetch inventory report');
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <div className="container">
      <center>
        <h1>Get Store Inventory</h1>
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
            {loading ? 'Loading...' : 'Get Inventory Report'}
          </button>
        </div>
      </form>
      {errorMessages && <div className="error-message">{errorMessages}</div>}
      {inventoryReport && (
        <div className="inventory-report">
          <h2>Inventory Report for {storename}</h2>
          <ul>
            {inventoryReport.map((item, index) => (
              <li key={index}>
                {item.ProductName} - Graphics: {item.Graphics}, Memory: {item.Memory}, Price: {item.Price}, Processor: {item.Processor}, ProcessorGen: {item.ProcessorGen}, StorageSize: {item.StorageSize}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
