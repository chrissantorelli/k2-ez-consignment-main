import React, { useState, useEffect } from 'react';
import placeholderImage from '../img/placeholder.png'
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export function Shop() {
  const [storeNames, setStoreNames] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedProcessor, setSelectedProcessor] = useState('');
  const [selectedProcessorGen, setSelectedProcessorGen] = useState('');
  const [selectedGraphics, setSelectedGraphics] = useState('');


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [userLocation, setUserLocation] = useState({ lat: '', lon: '' });


  const [purchaseMade, setPurchaseMade] = useState(false);

  const [compareProducts, setCompareProducts] = useState([]);

  const [ipAddress, setIpAddress] = useState('');


  const navigate = useNavigate();



  
  
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
  
  





  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     alert('Geolocation is not supported by your browser');
  //   } else {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setUserLocation({
  //           lat: position.coords.latitude,
  //           lon: position.coords.longitude,
  //         });
  //       },
  //       () => {
  //         alert('Unable to retrieve your location');
  //       }
  //     );
  //   }
  // };
  
  // useEffect(() => {
  //   getLocation();
  // }, []);
  


  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };


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


  // fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=204fa0a3e0a7463e895f8549a8cdf1c3')
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data); // Process your location data
  // })
  // .catch(error => {
  //   console.error('Error fetching location data:', error);
  // });

  

  useEffect(() => {
    fetch('https://trtz7au832.execute-api.us-east-1.amazonaws.com/initialStage/GetStoreNamesMattChrisResource', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        //console.log(data);
        const storeNames = parsedData.storeNames;
        setStoreNames(storeNames);
      })
      .catch((error) => {
        console.error('Error fetching store names:', error);
      });

    fetch('https://rqwgin3dfa.execute-api.us-east-1.amazonaws.com/initialStage/displayAllProductsResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setProducts(JSON.parse(data.body));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);


  // const buyProduct = async (productId, customerLat, customerLon) => {
  //   const data = {
  //     productId: parseInt(productId, 10),
  //     customerLat: parseFloat(customerLat),
  //     customerLon: parseFloat(customerLon)
  //   };
  
  //   try {
  //     const response = await fetch('https://lpsjpvp5a2.execute-api.us-east-1.amazonaws.com/buyProductStage/buyProductResource', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const result = await response.json();
  //     console.log('Success:', result);
  //     // Handle the response further as needed
  //     return result; // Returning the result for further processing
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // You might want to handle the error or throw it for the calling component to handle
  //     throw error;
  //   }
  // };
  
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
  }, [purchaseMade]); // Dependency on purchaseMade

  // const triggerConfetti = () => {
  //   confetti({
  //     particleCount: 100,
  //     spread: 70,
  //     origin: { y: 0.6 }
  //   });
  // };

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



  const handleCompareCheck = (productID, isChecked) => {
    setCompareProducts(prev => {
      if (isChecked) {
        // Add the product ID to the array
        return [...prev, productID];
      } else {
        // Remove the product ID from the array
        return prev.filter(id => id !== productID);
      }
    });
  };
  


  const handleCompareClick = () => {
    // Filter the selected products for comparison based on their IDs
    const selectedProductsForComparison = products.filter(product => 
      compareProducts.includes(product.ProductID)
    );
  
    // Navigate to Compare.js with the selected products as parameters
    navigate('/compare', { state: { products: selectedProductsForComparison } });
    console.log("Compare Button Clicked with products:", selectedProductsForComparison);
  };



  const handleStoreClick = (name) => {
    setSelectedStores((prevSelectedStores) => {
      if (prevSelectedStores.includes(name)) {
        // If the store is already selected, remove it
        return prevSelectedStores.filter((store) => store !== name);
      } else {
        // If the store is not selected, add it
        return [...prevSelectedStores, name];
      }
    });
  };


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
    triggerConfetti();
    let product_id = selectedProduct?.ProductID;
    let user_lat = userLocation.lat;
    let user_lon = userLocation.lon;
    getProductExistence(product_id);
    //console.log("from, button, buynow, ", productExists);
    let doesProductExist = sessionStorage.getItem('productExists');
    console.log(doesProductExist);
    if (doesProductExist === 'true') {
      buyProduct(product_id, user_lat, user_lon);
    } else {
        alert('Conflict: Two users buying the same product same time, please try again.');
        navigate('/shop');
    }
    setIsModalOpen(false);

  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleMemoryChange = (event) => {
    console.log(event.target.value);
    setSelectedMemory(event.target.value);
  }

  const handleStorageChange = (event) => {
    console.log(event.target.value);
    setSelectedStorage(event.target.value);
  }

  const handleProcessorChange = (event) => {
    //console.log(event.target.value);
    setSelectedProcessor(event.target.value);
  }


  const handleProcessorGenChange = (event) => {
    //console.log(event.target.value);
    setSelectedProcessorGen(event.target.value);
  }


  const handleGraphicsChange = (event) => {
   // console.log(event.target.value);
    setSelectedGraphics(event.target.value);
  }



  function isPriceInRange(price, selectedPriceRange) {
    let minPrice = 0, maxPrice = Infinity;

    switch(selectedPriceRange) {
      case "$2,001 or more":
        minPrice = 2001;
        break;
      case "$1,501 - $2,000":
        minPrice = 1501;
        maxPrice = 2000;
        break;
      case "$1,001 - $1,500":
        minPrice = 1001;
        maxPrice = 1500;
        break;
      case "$501 - $1000":
        minPrice = 501;
        maxPrice = 1000;
        break;
      case "$500 or less":
        maxPrice = 500;
        break;
      default:
        return true; 
    }

    return price >= minPrice && price <= maxPrice;
  }


// Utility function to check if a product's memory is within the selected range
function isMemoryInRange(memory, selectedMemoryRange) {
  let productMemory = parseInt(memory.split(' ')[0]);

  switch(selectedMemoryRange) {
    case "32 GB or more":
      return productMemory >= 32;
    case "16 GB":
      return productMemory === 16 || productMemory === 12;
    case "8 GB":
      return productMemory === 8;
    case "4GB or less":
      return productMemory <= 4;
    default:
      return true; // If no memory range is selected, all memory sizes are valid
  }
}

// Utility function to check if a product's storage is within the selected range
function isStorageInRange(storage, selectedStorageRange) {
  let productStorage;

  // Convert storage to a uniform format in GB for comparison
  if (storage.endsWith('TB')) {
    productStorage = parseInt(storage.replace('TB', '')) * 1024; // 1TB = 1024GB
  } else if (storage.endsWith('GB')) {
    productStorage = parseInt(storage.replace('GB', ''));
  }

  switch(selectedStorageRange) {
    case "2 TB or more":
      return productStorage >= 2048;
    case "1 TB":
      return productStorage >= 1024 && productStorage < 2048;
    case "512 GB":
      return productStorage === 512;
    case "256 GB or less":
      return productStorage <= 256;
    default:
      return true; // If no storage range is selected, all storage sizes are valid
  }
}

// Utility function to check if a product's processor matches the selected processor category
function isProcessorTypeMatch(processor, selectedProcessorCategory) {
  if (selectedProcessorCategory === "All Intel Processors") {
    return processor.includes("Intel");
  } else if (selectedProcessorCategory === "All AMD Processors") {
    return processor.includes("AMD");
  }
  return true; // If no processor category is selected, all processor types are valid
}

// Utility function to check if a product's processor generation matches the selected processor generation
function isProcessorGenMatch(processorGen, selectedProcessorGen) {
  return selectedProcessorGen ? processorGen === selectedProcessorGen : true;
}

// Utility function to check if a product's graphics card matches the selected graphics card category
function isGraphicsTypeMatch(graphics, selectedGraphicsCategory) {
  if (selectedGraphicsCategory === "All NVIDIA Graphics") {
    return graphics.includes("NVIDIA");
  } else if (selectedGraphicsCategory === "All AMD Graphics") {
    return graphics.includes("AMD");
  } else if (selectedGraphicsCategory === "All Intel Graphics") {
    return graphics.includes("Intel");
  }
  return true; // If no graphics category is selected, all graphics types are valid
}


const resetFilters = () => {
  setSelectedStores([]);
  setSearchQuery('');
  setSelectedPrice('');
  setSelectedMemory('');
  setSelectedStorage('');
  setSelectedProcessor('');
  setSelectedProcessorGen('');
  setSelectedGraphics('');
};


// Modify filteredProducts calculation
let filteredProducts = [];

if(Array.isArray(products)) {
  filteredProducts = products.filter((product) => {
    const isStoreSelected = selectedStores.length === 0 || selectedStores.includes(product.StoreName);
    const isWithinPriceRange = isPriceInRange(product.Price, selectedPrice);
    const isWithinMemoryRange = isMemoryInRange(product.Memory, selectedMemory);
    const isWithinStorageRange = isStorageInRange(product.StorageSize, selectedStorage);
    const isProcessorTypeSelected = isProcessorTypeMatch(product.Processor, selectedProcessor);
    const isProcessorGenSelected = isProcessorGenMatch(product.ProcessorGen, selectedProcessorGen);
    const isGraphicsTypeSelected = isGraphicsTypeMatch(product.Graphics, selectedGraphics);
    return isStoreSelected && isWithinPriceRange && isWithinMemoryRange && isWithinStorageRange && isProcessorTypeSelected && isProcessorGenSelected && isGraphicsTypeSelected;
  });
}

  



  
  

  // Filter store names based on the search query
  const filteredStoreNames = storeNames.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Shop</h1>
      {/* Flex Container for Stores and Filters */}
      <div style={{ display: 'flex' }}>
        {/* Store Names Section */}
        <div style={{ flex: 1, marginRight: 20 }}>
     
          <h2>Store Names:</h2>
          <input
            type="text"
            placeholder="Search for a store..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              margin: '5px',
              borderRadius: '1px',
              border: 'none',
            }}
          />
          <ul>
            {filteredStoreNames.map((name, index) => (
              <button
                key={index}
                onClick={() => handleStoreClick(name)}
                style={{
                  margin: '5px',
                  padding: '10px 20px',
                  background: selectedStores.includes(name) ? '#4caf50' : '#007bff',
                  color: '#fff',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {name}
              </button>
            ))}
          </ul>
        </div>
  
        {/* Filters Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>

        <div style={{ display: 'none' }}>
            <input
              type="radio"
              id="price-default"
              name="price"
              value=""
              onChange={handlePriceChange}
              checked={selectedPrice === ''}
            />
          </div>
            {/* Price Filter */}
            <div style={{ flex: 1, margin: '10px' }}>
              <h3>Price</h3>
              {["$2,001 or more", "$1,501 - $2,000", "$1,001 - $1,500", "$501 - $1000", "$500 or less"].map((price, index) => (
                <div key={index}>
                  <input type="radio" id={`price-${index}`} name="price" value={price} onChange={handlePriceChange}/>
                  <label htmlFor={`price-${index}`} >{price}</label>
                </div>
              ))}
            </div>

            <div style={{ display: 'none' }}>
            <input
              type="radio"
              id="memory-default"
              name="memory"
              value=""
              onChange={handleMemoryChange}
              checked={selectedMemory === ''}
            />
          </div>



            {/* Memory Filter */}
            <div style={{ flex: 1, margin: '10px' }}>
              <h3>Memory (RAM)</h3>
              {["32 GB or more", "16 GB", "8 GB", "4GB or less"].map((memory, index) => (
                <div key={index}>
                  <input type="radio" id={`memory-${index}`} name="memory" value={memory} onChange={handleMemoryChange} />
                  <label htmlFor={`memory-${index}`}>{memory}</label>
                </div>
              ))}
            </div>




            <div style={{ display: 'none' }}>
            <input
              type="radio"
              id="storage-default"
              name="storage"
              value=""
              onChange={handleStorageChange}
              checked={selectedStorage === ''}
            />
          </div>





            {/* Storage Size Filter */}
            <div style={{ flex: 1, margin: '10px' }}>
              <h3>Storage Size</h3>
              {["2 TB or more", "1 TB", "512 GB", "256 GB or less"].map((storage, index) => (
                <div key={index}>
                  <input type="radio" id={`storage-${index}`} name="storage" value={storage} onChange={handleStorageChange}/>
                  <label htmlFor={`storage-${index}`}>{storage}</label>
                </div>
              ))}
            </div>







            <div style={{ display: 'none' }}>
            <input
              type="radio"
              id="processor-default"
              name="processor"
              value=""
              onChange={handleProcessorChange}
              checked={selectedProcessor === ''}
            />
          </div>






            {/* Processor Filter */}
            <div style={{ flex: 1, margin: '10px' }}>
              <h3>Processor</h3>
              {["All Intel Processors", "All AMD Processors"].map((processor, index) => (
                <div key={index}>
                  <input type="radio" id={`processor-${index}`} name="processor" value={processor} onChange={handleProcessorChange}/>
                  <label htmlFor={`processor-${index}`}>{processor}</label>
                </div>
              ))}
            </div>



            



            <div style={{ display: 'none' }}>
            <input
              type="radio"
              id="processorGen-default"
              name="processorGen"
              value=""
              onChange={handleProcessorGenChange}
              checked={selectedProcessorGen === ''}
            />
          </div>

            {/* Processor Generation Filter */}
            <div style={{ flex: 1, margin: '10px' }}>
              <h3>Processor Gen.</h3>
              {["13th Gen Intel", "12th Gen Intel", "11th Gen Intel", "AMD Ryzen 7000 Series", "AMD Ryzen 6000 Series"].map((generation, index) => (
                <div key={index}>
                  <input type="radio" id={`processorGen-${index}`} name="processorGeneration" value={generation} onChange={handleProcessorGenChange}/>
                  <label htmlFor={`processorGen-${index}`}>{generation}</label>
                </div>
              ))}
            </div>



            <div style={{ display: 'none'}}>
            <input
              type="radio"
              id="graphics-default"
              name="graphics"
              value=""
              onChange={handleGraphicsChange}
              checked={selectedGraphics === ''}
            />
            <label htmlFor="processorGen-default">All Generations</label>
          </div>

            {/* Graphics Filter */}
            <div style={{ flex: 1, margin: '10px' }}>
              <h3>Graphics</h3>
              {["All NVIDIA Graphics", "All AMD Graphics", "All Intel Graphics"].map((graphics, index) => (
                <div key={index}>
                  <input type="radio" id={`graphics-${index}`} name="graphics" value={graphics} onChange={handleGraphicsChange} />
                  <label htmlFor={`graphics-${index}`}>{graphics}</label>
                </div>
              ))}
            </div>

            <button 
        onClick={resetFilters} 
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          background: '#007bff',
          color: '#fff',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Reset Filters
      </button>


</div>
      </div>
      
{/* Products Section */}
<div>
  <h2>Products:</h2>
  <ul style={{ listStyleType: 'none', padding: 20 }}>
    {filteredProducts.map((product, index) => (
      <li
        key={index}
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          display: 'flex', // Flex layout
          justifyContent: 'space-between', // Space between text and image
        }}
      >
        {/* Product Details */}
        <div style={{ flex: 1 }}> {/* Flex item for text */}
          <strong>Store Name: {product.StoreName}</strong>
          <br />
          <strong>Product Name: {product.ProductName}</strong>
          <div>
            <p>Graphics: {product.Graphics}</p>
            <p>Memory: {product.Memory}</p>
            <p>Price: ${product.Price}</p>
            <p>Processor: {product.Processor}</p>
            <p>Processor Gen: {product.ProcessorGen}</p>
            <p>Storage Size: {product.StorageSize}</p>
          </div>
          <button
            onClick={() => handleBuyClick(product)}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              background: '#4caf50',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Buy
          </button>
        </div>

        {/* Product Image */}
        <div> {/* Flex item for image */}
          <img
            src={placeholderImage}
            alt="Product Placeholder"
            style={{ width: '150px', height: '150px' }}
          />
                  <div>
          <input
            type="checkbox"
            id={`compareCheckbox-${product.ProductID}`}
            onChange={(e) => handleCompareCheck(product.ProductID, e.target.checked)}
          />
          <label htmlFor={`compareCheckbox-${product.ProductID}`}></label>
                    <button
            onClick={handleCompareClick}
            disabled={compareProducts.length === 0}
          >
            Compare
          </button>
        


      </div>
        </div>
      </li>
    ))}
  </ul>
</div>
{isModalOpen && (
  <div style={{
    position: 'fixed', // Fixed position
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust for centering
    backgroundColor: 'white', // Background color
    padding: '20px', // Padding
    border: '1px solid black', // Border
    zIndex: 1000, // Ensure it's on top
  }}>
    <div>
      <h2>Product Details</h2>
      <p style={{display:"none"}}><strong>Product ID:</strong> {selectedProduct?.ProductID}</p>
      <p><strong>Store Name:</strong> {selectedProduct?.StoreName}</p>
      <p><strong>Product Name:</strong> {selectedProduct?.ProductName}</p>
      <p><strong>Price:</strong> ${selectedProduct?.Price}</p>
      <p><strong>User Location (Approx.):</strong> Lat: {userLocation.lat}, Lon: {userLocation.lon}</p>
      <button onClick={handleBuyNowClick}>Buy Now!</button>
      <button onClick={handleCloseModal}>Close</button>
    </div>
  </div>
)}
    </div>
  );
              } 