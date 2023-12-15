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

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export function DollarReportOfSiteInventoryByVirtualStore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order is ascending

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
        const responseBody = JSON.parse(responseData.body);

        if (Array.isArray(responseBody.inventoryByVirtualStore)) {
          // Sort the data based on the sortOrder
          const sortedData = responseBody.inventoryByVirtualStore.sort((a, b) => {
            if (sortOrder === 'asc') {
              return a.TotalInventoryValue - b.TotalInventoryValue;
            } else {
              return b.TotalInventoryValue - a.TotalInventoryValue;
            }
          });

          setData(sortedData);
        } else {
          throw new Error('Data structure is not as expected');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOrder]);

  // Function to toggle the sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="container">
      <center>
        <h1>Generate report of site inventory aggregated by virtual store</h1>
        <button style={buttonStyle} onClick={toggleSortOrder}>
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
      </center>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        error.includes("Data structure is not as expected") ? (
          <div>No Virtual Stores</div>
        ) : (
          <div className="error-message">{error}</div>
        )
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Store Name</th>
              <th style={thStyle}>Total Inventory Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.StoreName}</td>
                <td style={tdStyle}>{formatCurrency(item.TotalInventoryValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
