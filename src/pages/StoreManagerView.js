import React from 'react';
import { useNavigate } from 'react-router-dom';

export function StoreManagerView() {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(`${path}`);
  };

  return (
    <div>
      <h1>Store Manager View</h1>
      <button onClick={() => navigateToPage('/store-manager-view/create-store')}>Create Virtual Store</button> <br></br>
      <button onClick={() => navigateToPage('/store-manager-view/add-computer')}>Add Computer To Store Inventory</button> <br></br>
      <button onClick={() => navigateToPage('/store-manager-view/modify-price')}>Modify Price Of Computer In Inventory</button> <br></br>
      <button onClick={() => navigateToPage('/store-manager-view/remove-computer')}>Remove Computer From Inventory</button> <br></br>
      <button onClick={() => navigateToPage('/store-manager-view/generate-report')}>Generate Report Of Inventory</button>
    </div>
  );
}