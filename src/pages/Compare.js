import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

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

export function Compare() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: '', lon: '' });
  const [purchaseMade, setPurchaseMade] = useState(false);

  useEffect(() => {
    if (location.state && location.state.products) {
      setProducts(location.state.products);
      location.state.products.forEach(product => {
        console.log("Product ID: ", product.ProductID);
      });
    } else {
      setError("No products data was passed to the comparison page.");
      console.error("No products data was passed to the comparison page.");
    }
  }, [location.state, purchaseMade]);

  const handleReturnToShop = () => {
    navigate('/shop'); // Adjust the route as needed
  };

  const handleBuyProduct = async (productId) => {
    // Implement your buying logic here
    console.log(`Buying product with ID: ${productId}`);
    // Example: navigate(`/buy/${productId}`);
    // For demonstration, triggering confetti
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
      <button onClick={handleReturnToShop} style={{ marginBottom: '20px' }}>Return to Shop</button>
      {error && <p className="error">{error}</p>}
      <div className="compare-table">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <th style={thStyle}>Product ID</th>
                    <td style={tdStyle}>{product.ProductID}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Product Name</th>
                    <td style={tdStyle}>{product.ProductName}</td>
                  </tr>
                  <tr>
                    <th style={thStyle}>Price</th>
                    <td style={tdStyle}>${product.Price}</td>
                  </tr>
                  {/* Add more rows as needed based on your product attributes */}
                </tbody>
              </table>
              <button onClick={() => handleBuyProduct(product.ProductID)} style={{ marginLeft: '10px', padding: '8px 16px' }}>
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
