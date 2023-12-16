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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userLocation, setUserLocation] = useState({ lat: '', lon: '' });
    const [purchaseMade, setPurchaseMade] = useState(false);


    useEffect(() => {
        fetch('https://rqwgin3dfa.execute-api.us-east-1.amazonaws.com/initialStage/displayAllProductsResource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
        .then((response) => response.json())
        .then((data) => {
          setProducts(JSON.parse(data.body));
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
      }, [purchaseMade]);

    useEffect(() => {
        fetch('http://ip-api.com/json')
          .then(res => res.json())
          .then(data => {
            if (data && data.lat && data.lon) {
              setUserLocation({ lat: data.lat, lon: data.lon });
            }
          })
          .catch(err => console.error('Error fetching location:', err));
      }, []);

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
          setPurchaseMade(prev => !prev); // Toggle purchaseMade to refresh the product list
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      };


    const handleBuyProduct = async (productId) => {
        console.log("Buy Now Clicked!");
        // console.log(computerID)
        setSelectedProduct(productId);
         triggerConfetti();
         let product_id = productId;
         let user_lat = userLocation.lat;
         let user_lon = userLocation.lon;
         console.log(product_id, user_lat, user_lon);
         buyProduct(product_id, user_lat, user_lon);
      };

      const triggerConfetti = () => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      };

    useEffect(() => {
      if (location.state && location.state.products) {
        setProducts(location.state.products);
        //console.log("Received products for comparison:", location.state.products);
        location.state.products.forEach(product => {
          console.log("Product ID: ", product.productId);
        });   
      } else {
        setError("No products data was passed to the comparison page.");
        console.error("No products data was passed to the comparison page.");
      }
    }, [location.state]);
    //COME BCK HERE
    

    const handleReturnToShop = () => {
        navigate('/shop'); // Assuming '/shop' is the route to your shop page
      };
    
      const handleBuy = (productId) => {
        // Implement your buying logic here, or navigate to the product's page
        console.log(`Buy product with ID: ${productId}`);
        // navigate(`/buy/${productId}`); // Example route for buying a product
      };

    // Generate table headers based on product attributes
    const headers = ['Product ID', 'Product Name', 'Price', 'Memory', 'Processor', 'Graphics', 'Storage Size'];
  
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
                      <tr>
                        <th style={thStyle}>Memory</th>
                        <td style={tdStyle}>{product.Memory}</td>
                      </tr>
                      <tr>
                        <th style={thStyle}>Processor</th>
                        <td style={tdStyle}>{product.Processor}</td>
                      </tr>
                      <tr>
                        <th style={thStyle}>Graphics</th>
                        <td style={tdStyle}>{product.Graphics}</td>
                      </tr>
                      <tr>
                        <th style={thStyle}>Storage Size</th>
                        <td style={tdStyle}>{product.StorageSize}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button 
                    onClick={() => handleBuyProduct(product.ProductID)} 
                    style={{ 
                      marginLeft: '40px',
                      marginRight: '40px', 
                      padding: '10px 20px', 
                      background: '#4caf50', 
                      color: '#fff', 
                      borderRadius: '5px', 
                      border: 'none', 
                      cursor: 'pointer',
                    }}>
                    Buy
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
  