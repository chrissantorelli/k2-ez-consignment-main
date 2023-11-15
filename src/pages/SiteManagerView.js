import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SiteManagerView() {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(`${path}`);
  };

  return (
    <div>
      <h1>Site Manager View</h1>
      <button onClick={() => navigateToPage('/site-manager-view/generate-report')}>Generate Report Of Total Site Inventory in $$</button> <br></br>
      <button onClick={() => navigateToPage('/site-manager-view/generate-aggregated-report')}>Generate Report Site Inventory Aggregated By Virtual Store</button> <br></br>
      <button onClick={() => navigateToPage('/site-manager-view/generate-balance')}>Generate Balance For Each Virtual Store</button> <br></br>
      <button onClick={() => navigateToPage('/site-manager-view/report-profits')}>Report $$ Profits For Each Store And For Site Manager</button> <br></br>
      <button onClick={() => navigateToPage('/site-manager-view/remove-store')}>Remove Virtual Store</button> <br></br>
    </div>
  );
}