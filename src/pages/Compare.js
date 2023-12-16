import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

export function Compare() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state && location.state.products) {
      setProducts(location.state.products);
      console.log("Received products for comparison:", location.state.products);
    } else {
      setError("No products data was passed to the comparison page.");
      console.error("No products data was passed to the comparison page.");
    }
  }, [location.state]);

  return (
    <div className="container">
      <center><h1>Product Comparison</h1></center>
      {error && <p className="error">{error}</p>}
      {products.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Memory</th>
              <th style={thStyle}>Processor</th>
              <th style={thStyle}>Graphics</th>
              <th style={thStyle}>Storage Size</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td style={tdStyle}>{product.ProductName}</td>
                <td style={tdStyle}>${product.Price}</td>
                <td style={tdStyle}>{product.Memory}</td>
                <td style={tdStyle}>{product.Processor}</td>
                <td style={tdStyle}>{product.Graphics}</td>
                <td style={tdStyle}>{product.StorageSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !error && (
        <p>No products selected for comparison or data is still loading.</p>
      )}
    </div>
  );
}
export default Compare;
