import React, { useState, useEffect } from 'react';
import '../../css/ListProducts.css'; // Importing the CSS file


function ListStoresProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://y4c3y3jhe0.execute-api.us-east-1.amazonaws.com/listastoresproductsstage/listastoresproductsresource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ STORE_NAME: 'Worcester' }), // Specify the store name
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.statusCode === 200) {
          setProducts(JSON.parse(data.body)); // Parse the JSON data and set it in the state
          setLoading(false);
        } else {
          throw new Error(data.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch products: ' + error.message);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Products for Store: Boston</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Graphics</th>
              <th>Memory</th>
              <th>Price</th>
              <th>Processor</th>
              <th>Processor Generation</th>
              <th>Storage Size</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.ProductID}>
                <td>{product.ProductID}</td>
                <td>{product.ProductName}</td>
                <td>{product.Graphics}</td>
                <td>{product.Memory}</td>
                <td>{product.Price}</td>
                <td>{product.Processor}</td>
                <td>{product.ProcessorGen || 'N/A'}</td>
                <td>{product.StorageSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListStoresProducts;
