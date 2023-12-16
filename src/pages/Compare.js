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
  
    // Generate table headers based on product attributes
    const headers = ['Product Name', 'Price', 'Memory', 'Processor', 'Graphics', 'Storage Size'];
  
    return (
      <div className="container">
        <center><h1>Product Comparison</h1></center>
        {error && <p className="error">{error}</p>}
        <div className="compare-table">
          {products.length > 0 ? (
            products.map((product, index) => (
              <table key={index} style={{ ...tableStyle, margin: '10px', display: 'inline-table' }}>
                <tbody>
                  {headers.map((header, idx) => (
                    <tr key={idx}>
                      <th style={thStyle}>{header}</th>
                      <td style={tdStyle}>
                        {header === 'Product Name' && product.ProductName}
                        {header === 'Price' && `$${product.Price}`}
                        {header === 'Memory' && product.Memory}
                        {header === 'Processor' && product.Processor}
                        {header === 'Graphics' && product.Graphics}
                        {header === 'Storage Size' && product.StorageSize}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))
          ) : !error && (
            <p>No products selected for comparison or data is still loading.</p>
          )}
        </div>
      </div>
    );
  }
  export default Compare;
  