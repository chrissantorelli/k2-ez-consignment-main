import React, { useState, useEffect } from 'react';

export function ModifyPrice() {
  const [storeName, setStoreName] = useState('');
  const [storeOptions, setStoreOptions] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');

    if (!username) {
      console.error('Username not found in local storage');
      return;
    }

    fetch('https://v9ka10czi7.execute-api.us-east-1.amazonaws.com/initial/GetStoresFromUserMattResource', {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      const stores = JSON.parse(data.body);
      setStoreOptions(stores.map(store => store.StoreName));
    })
    .catch(error => console.error('Error fetching store names:', error));
  }, []);

  useEffect(() => {
    if (storeName) {
      fetch('https://y4c3y3jhe0.execute-api.us-east-1.amazonaws.com/listastoresproductsstage/listastoresproductsresource', {
        method: 'POST',
        body: JSON.stringify({ "STORE_NAME" : storeName }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
        const products = JSON.parse(data.body);
        setSelectedProducts(products);
      })
      .catch(error => console.error('Error fetching products:', error));
    }
  }, [storeName]);

  const handleStoreChange = (e) => {
    setStoreName(e.target.value);
    setProductId(''); // Reset product ID when changing stores
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
  };

  const handleClick = () => {
    // Validation checks
    if (!productId) {
      setErrorMessages(['Please select a Product ID.']);
      return;
    }
    if (!newPrice) {
      setErrorMessages(['Please enter the new price.']);
      return;
    }

    setErrorMessages([]);

    fetch('https://sk9zhtxtfh.execute-api.us-east-1.amazonaws.com/initial/modifyprice', {
      method: 'POST',
      body: JSON.stringify({ ProductID: productId, NewPrice: newPrice }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      setResult(data.body);
      alert(`Price for product with ProductID '${productId}' updated successfully to '${newPrice}'.`);
    })
    .catch(error => {
      alert('Error updating product price');
    });
  };

  return (
    <div className="container">
      <center><h1>Modify Product Price</h1></center>
      <form>
        <div className="form-group">
          <label htmlFor="storeName">Store Name:</label>
          <select
            id="storeName"
            value={storeName}
            onChange={handleStoreChange}
            required
          >
            <option value="">Select Store</option>
            {storeOptions.map((store, index) => (
              <option key={index} value={store}>{store}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="productId">Product ID:</label>
          <select
            id="productId"
            value={productId}
            onChange={handleProductChange}
            required
          >
            <option value="">Select Product</option>
            {selectedProducts.map((product, index) => (
              <option key={index} value={product.ProductID}>{product.ProductID}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="newPrice">New Price:</label>
          <input
            type="text"
            id="newPrice"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
        </div>
        <div className="error-message">
          {errorMessages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="form-group">
          <button type="button" onClick={handleClick}>
            Update Price
          </button>
        </div>
        
      </form>
      {result && (
        <div className="result-message">
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
}
