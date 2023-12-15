import React, { useState, useEffect } from 'react';

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
        setProducts(JSON.parse(data.body));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBuyClick = (product) => {
    // Display product information in the console
    console.log('Product Information:');
    console.log('Store Name:', product.StoreName);
    console.log('Product Name:', product.ProductName);
    console.log('Graphics:', product.Graphics);
    console.log('Memory:', product.Memory);
    console.log('Price:', product.Price);
    console.log('Processor:', product.Processor);
    console.log('Processor Gen:', product.ProcessorGen);
    console.log('Storage Size:', product.StorageSize);
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
    console.log(event.target.value);
    setSelectedProcessor(event.target.value);
  }


  const handleProcessorGenChange = (event) => {
    console.log(event.target.value);
    setSelectedProcessorGen(event.target.value);
  }


  const handleGraphicsChange = (event) => {
    console.log(event.target.value);
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


  function isMemoryInRange(memory, selectedMemoryRange) {
    let minMemory = 0, maxMemory = Infinity;

    switch(selectedMemoryRange) {
      case "32 GB or more":
        minMemory = 32;
        break;
      case "16 GB":
        minMemory = 16;
        maxMemory = 32;
        break;
      case "8 GB":
        minMemory = 8;
        maxMemory = 16;
        break;
      case "4GB or less":
        maxMemory = 4;
        break;
      default:
        return true; 
    }

    return memory >= minMemory && memory <= maxMemory;
  }


  // THIS IS WHERE YOU ARE WORKING 


  
let filteredProducts = [];

if(Array.isArray(products)) {
  filteredProducts = products.filter((product) => {
    const isStoreSelected = selectedStores.length === 0 || selectedStores.includes(product.StoreName);
    const isWithinPriceRange = isPriceInRange(product.Price, selectedPrice);
    const isWithinMemoryRange = isMemoryInRange(product.Memory, selectedMemory);
    return isStoreSelected && isWithinPriceRange && isWithinMemoryRange;
  });
}

// ... (rest of the component)



  



  
  

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

            {/* Price Filter */}
            <div style={{ flex: 1, margin: '10px' }}>
              <h3>Price</h3>
              {["$2,001 or more", "$1,501 - $2,000", "$1,001 - $1,500", "$501 - $1000", "$500 or less"].map((price, index) => (
                <div key={index}>
                  <input type="radio" id={`price-${index}`} name="price" value={price} onChange={handlePriceChange}/>
                  <label htmlFor={`price-${index}`}>{price}</label>
                </div>
              ))}
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
              }}
            >
              {/* Product Details */}
              <div>
                <strong>Store Name: {product.StoreName}</strong>
                <br />
                <strong>Product Name: {product.ProductName}</strong>
              </div>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
              }  