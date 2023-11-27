import React, { useState, useEffect } from 'react';

export function DollarReportOfSiteInventoryByVirtualStore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading set to true
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setError('');

      try {
        const response = await fetch('https://7iylovqv91.execute-api.us-east-1.amazonaws.com/initial/DollarReportOfSiteInvetoryByVirtualStoreResource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const responseBody = JSON.parse(responseData.body); // Parse the body as JSON

        if (Array.isArray(responseBody.inventoryByVirtualStore)) {
          setData(responseBody.inventoryByVirtualStore);
        } else {
          throw new Error('Data structure is not as expected');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after the fetch operation
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <center>
        <h1>Dollar Report of Site Inventory By Virtual Store</h1>
      </center>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Total Inventory Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.StoreName}</td>
                <td>{item.TotalInventoryValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
