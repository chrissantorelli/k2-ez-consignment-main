import React, { useState } from 'react';
import '../../css/ListProducts.css'; // Importing the CSS file

function ListStoresProducts() {
  const [storeName, setStoreName] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://y4c3y3jhe0.execute-api.us-east-1.amazonaws.com/listastoresproductsstage/listastoresproductsresource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ STORE_NAME: storeName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.statusCode === 200) {
        setProducts(JSON.parse(data.body));
        setLoading(false);
      } else {
        throw new Error(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch products: ' + error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="container">
      <h1>Products for Store: {storeName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="store-name-input">
          <label htmlFor="storeName">Enter Store Name: </label>
          <input
            type="text"
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
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
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.ProductID}</td>
                <td>{product.ProductName}</td>
                <td>{product.Graphics}</td>
                <td>{product.Memory}</td>
                <td>${product.Price.toFixed(2)}</td>
                <td>{product.Processor}</td>
                <td>{product.ProcessorGen || '-'}</td>
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
