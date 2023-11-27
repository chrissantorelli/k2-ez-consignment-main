import React, { useState, useEffect } from 'react';

export function ReportDollarBalance() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://bask2mngr6.execute-api.us-east-1.amazonaws.com/mystage/getDollarBalance', {
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

        // Access the 'totalBalance' property and store it in a variable
        const totalBalance = bodyData.totalBalance;

        //console.log(totalBalance); // This will print the value of totalBalance (0 in this case)




        if (data.statusCode === 200) {
          //console.log(totalBalance); // This will print the value of totalBalance (0 in this case)

          setBalance(totalBalance); // Assuming the API response has a "balance" field
        } else {
          throw new Error(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch balance report: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div className="container">
      <center>
        <h1>Site Manager Dollar Balance Report</h1>
      </center>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {balance !== null && (
        <div>
          <p>Site Manager's Dollar Balance: ${balance}</p>
        </div>
      )}
    </div>
  );
}
