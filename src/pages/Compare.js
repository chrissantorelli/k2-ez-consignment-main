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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

//   const fetchProducts = () => {
//      if (location.state && location.state.products) {
//         setProducts(location.state.products);
//   } else {
//      setError("No products data was passed to the comparison page.");
//    }
//  };

//   useEffect(() => {
//       fetchProducts();
//   }, [location.state, purchaseMade]);

const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedProduct(null);
};

const fetchProducts = () => {
  if (location.state && location.state.products) {
    console.log("Received products:", location.state.products); // Debugging
    setProducts(location.state.products);
  } else {
    setError("No products data was passed to the comparison page.");
  }
};

useEffect(() => {
  fetchProducts();
}, [location.state]);

// Add this to see if the products state updates correctly
useEffect(() => {
  console.log("Products state updated:", products);
}, [products]);


const checkProductExists = (productId) => {
  // Return the fetch promise chain
  return fetch('https://lbdu510k23.execute-api.us-east-1.amazonaws.com/initial/doesProductExistResource', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productID: productId }),
  })
  .then(response => response.json())
  .then(data => {
      const responseBody = JSON.parse(data.body);
      return responseBody.productExists;  // Return the existence directly from the promise chain
  })
  .catch(error => {
      console.error('Error:', error);
      return false;  // Make sure to return false in case of an error
  });
};

async function getProductExistence(productId) {
  try {
    const doesProductExist = await checkProductExists(productId);
    //console.log('Product exists:', doesProductExist);
    //console.log(doesProductExist);
    sessionStorage.setItem('productExists', doesProductExist);
  } catch (error) {
    // Handle any errors that occurred during fetch
  }
}






const handleBuyNowClick = (product) => {
  console.log("Buy Now Clicked!");
 // console.log(computerID)
  let product_id = selectedProduct?.ProductID;
  let user_lat = userLocation.lat;
  let user_lon = userLocation.lon;
  console.log("product id: ", product_id); 
  console.log("user lat", user_lat); 
  console.log("user lon", user_lon); 
  getProductExistence(product_id);
  //console.log("from, button, buynow, ", productExists);
  let doesProductExist = sessionStorage.getItem('productExists');
  console.log("results from does product exist session storage", doesProductExist);
  if (doesProductExist === 'true') {
    alert('Transaction Successful Thank you');
    buyProduct(product_id, user_lat, user_lon);
    triggerConfetti();
  } else {
      alert('Conflict: Two users buying the same product same time, please try again.');
      navigate('/shop');
  }
  setIsModalOpen(false);

};
  

  const handleReturnToShop = () => {
    navigate('/shop');
  };

  const buyProduct = async (productId, customerLat, customerLon) => {
    const data = {
      productId: parseInt(productId, 10),
      customerLat: parseFloat(customerLat),
      customerLon: parseFloat(customerLon)
    };
    //console.log(data);
  
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
      //alert('Success: ' + result);

      triggerConfetti();
      setPurchaseMade(prev => !prev); // Toggle purchaseMade to refresh the product list
    } catch (error) {
      alert(`Error: ${error.message}`);
      throw error;
    }
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
              <button onClick={() => handleBuyNowClick(product.ProductID)} style={buttonStyle}>
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
