import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import placeholderImage from '../img/placeholder.png'
import confetti from 'canvas-confetti';

// Adjusted styles
const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginLeft: '10px',
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
  padding: '10px 20px',
  background: '#4caf50',
  color: '#fff',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  margin: '5px'
};

const errorStyle = {
  color: 'red',
  marginBottom: '20px'
};

export function Compare() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state && location.state.products) {
      setProducts(location.state.products);
    } else {
      setError("No products data was passed to the comparison page.");
    }
  }, [location.state]);

  const handleReturnToShop = () => {
    navigate('/shop');
  };

  const handleBuyProduct = async (productId) => {
    console.log(`Buying product with ID: ${productId}`);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="container">
      <center><h1>Product Comparison</h1></center>
      <button onClick={handleReturnToShop} style={buttonStyle}>Return to Shop</button>
      {error && <p style={errorStyle}>{error}</p>}
      <div className="compare-table">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <table style={tableStyle}>
                <tbody>
                  <tr style={{ visibility: 'hidden' }}>
                    <th style={{ visibility: 'hidden' }}>Product ID</th>
                    <td style={{ visibility: 'hidden' }}>{product.ProductID}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>
                    <img
                          src={placeholderImage}
                          alt="Product Placeholder"
                          style={{ width: '150px', height: '150px' }}
                        />
                      <p>Product Name</p>
                      </th>
                    <td style={tdStyle}>
                      <img
                          src={placeholderImage}
                          alt="Product Placeholder"
                          style={{ width: '150px', height: '150px', visibility: 'hidden' }}
                        />
                      
                      <p>{product.ProductName}</p>
                      
                      </td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Price</th>
                    <td style={tdStyle}>${product.Price}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Graphics</th>
                    <td style={tdStyle}>{product.Graphics}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Memory</th>
                    <td style={tdStyle}>{product.Memory}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Price</th>
                    <td style={tdStyle}>${product.Price}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Processor</th>
                    <td style={tdStyle}>{product.Processor}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Processor Gen</th>
                    <td style={tdStyle}>{product.ProcessorGen}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Storage Size</th>
                    <td style={tdStyle}>{product.StorageSize}</td>
                  </tr>
                  {/* Add more rows as needed based on your product attributes */}
                </tbody>
              </table>
              <button onClick={() => handleBuyProduct(product.ProductID)} style={buttonStyle}>
                Buy Now
              </button>
            </div>
          ))
        ) : !error && (
          <p>No products selected for comparison or data is still loading.</p>
        )}
      </div>
    </div>
  );
}

export default Compare;
