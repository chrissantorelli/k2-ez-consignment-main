import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import placeholderImage from '../img/placeholder.png';
import confetti from 'canvas-confetti';
import axios from 'axios';

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
  const [ipAddress, setIpAddress] = useState('');

  const [userLocation, setUserLocation] = useState({ lat: '', lon: '' });
  const [purchaseMade, setPurchaseMade] = useState(false);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
        console.log('IP fetched and set:', response.data.ip);
      } catch (error) {
        console.error('Error fetching the IP address:', error);
      }
    };
  
    fetchIP();
  }, []);

  // useEffect(() => {
  //   if (ipAddress) {
  //     console.log(ipAddress);
  //   }
  // }, [ipAddress]);

  useEffect(() => {
    const httpGetAsync = (url, callback) => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    if (ipAddress) {
        const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=204fa0a3e0a7463e895f8549a8cdf1c3&ip_address=${ipAddress}`;
        httpGetAsync(url, (response) => {
          const geolocationData = JSON.parse(response);
          //console.log('Latitude:', geolocationData.latitude, 'Longitude:', geolocationData.longitude);
          setUserLocation({
            lat: geolocationData.latitude,
            lon: geolocationData.longitude
        });
        });
    }
}, [ipAddress]);

  // useEffect(() => {
  //   fetch('http://ip-api.com/json')
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data && data.lat && data.lon) {
  //         setUserLocation({ lat: data.lat, lon: data.lon });
  //       }
  //     })
  //     .catch(err => console.error('Error fetching location:', err));
  // }, []);

  // const fetchProducts = () => {
  //   if (location.state && location.state.products) {
  //     setProducts(location.state.products);
  //   } else {
  //     setError("No products data was passed to the comparison page.");
  //   }
  // };

  useEffect(() => {
    fetchProducts();
  }, [location.state, purchaseMade]);

  const buyProduct = async (productId, customerLat, customerLon) => {
    const data = {
      productId: parseInt(productId, 10),
      customerLat: parseFloat(customerLat),
      customerLon: parseFloat(customerLon)
    };
  
    try {
      const response = await fetch('https://lpsjpvp5a2.execute-api.us-east-1.amazonaws.com/buyProductStage/buyProductResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Success:', result);
      triggerConfetti();
  
      // Remove the purchased product from the products array
      const updatedProducts = products.filter(product => product.ProductID !== productId);
      setProducts(updatedProducts); // Update the products state
  
    } catch (error) {
      alert(`Error: ${error.message}`);
      throw error;
    }
  };
  

  const handleReturnToShop = () => {
    navigate('/shop');
  };

  const handleBuyProduct = async (productId) => {
    buyProduct(productId, userLocation.lat, userLocation.lon);
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
                    <th style={thStyle}>Product Name</th>
                    <td style={tdStyle}>{product.ProductName}</td>
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
