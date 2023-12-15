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

export function GetBalances() {
  const [storeBalances, setStoreBalances] = useState({});
  const [errorMessages, setErrorMessages] = useState('');
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    // Making a POST request to fetch store balances
    const fetchStoreBalances = async () => {
      setErrorMessages('');
      try {
        const response = await fetch('https://dzhjm8a09a.execute-api.us-east-1.amazonaws.com/initialstage/get-store-balance', {
          method: 'POST', // Specify the HTTP method as POST
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify({}), // Include the request body if needed
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.statusCode === 200) {
          setStoreBalances(JSON.parse(data.body));
        } else {
          throw new Error(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessages('Failed to fetch store balances: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchStoreBalances(); // Call the fetchStoreBalances function when the component mounts
  }, []);

  // Helper function to render table rows
  const renderTableRows = (data) => (
    Object.entries(data).map(([store, balance], index) => (
      <tr key={index}>
        <td style={tdStyle}>{store}</td>
        <td style={tdStyle}>${balance.toFixed(2)}</td>
      </tr>
    ))
  );

  return (
    <div className="container">
      <center>
        <h1>Generate Balance For Each Virtual Store</h1>
      </center>
      {errorMessages && <div className="error-message">{errorMessages}</div>}
      {/* Table to display store balances */}
      {!loading && storeBalances && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Store</th>
              <th style={thStyle}>Balance</th>
            </tr>
          </thead>
          <tbody>{renderTableRows(storeBalances)}</tbody>
        </table>
      )}
    </div>
  );
}
