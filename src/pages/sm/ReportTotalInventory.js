import React, { useState, useEffect } from 'react';

export function ReportTotalInventory() {
  const [data, setData] = useState({});
  const [total, setTotal] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setError('');

      try {
        const response = await fetch('https://d7nsqne9fc.execute-api.us-east-1.amazonaws.com/initialstage/SMGenerateReportOfTotalSiteinventoryResource', {
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
        //console.log(responseData);
        const responseBody = JSON.parse(responseData.body);

        // Access the 'totalInventoryValue' property
        const totalInventoryValue = responseBody.totalInventoryValue;

        //console.log(`Total Inventory Value: $${totalInventoryValue}`);

        setTotal(totalInventoryValue);



        setData(responseData);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <center>
        <h1>Report of Total Site Inventory</h1>
      </center>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <p>{data.message}</p>
          <p>Total Inventory Value: ${total}</p>
        </div>
      )}
    </div>
  );
}
