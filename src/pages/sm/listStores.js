import React, { useState, useEffect } from 'react';

function ListStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch('https://zywt8aq7qd.execute-api.us-east-1.amazonaws.com/liststoresstage/liststoresresource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Sending an empty object as the request body
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Parse the 'body' property to extract the JSON data within it
        const bodyData = JSON.parse(data.body);

        if (data.statusCode === 200) {
          setStores(bodyData); // Assuming the API response contains an array of stores
          setLoading(false);
        } else {
          throw new Error(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch stores: ' + error.message);
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  return (
    <div className="container">
      <h1>List of Stores</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {stores.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Store ID</th>
              <th>Store Name</th>
              <th>LAT</th>
              <th>LON</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={index}>
                <td>{store.StoreID}</td>
                <td>{store.StoreName}</td>
                <td>{store.LAT}</td>
                <td>{store.LON}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListStores;
