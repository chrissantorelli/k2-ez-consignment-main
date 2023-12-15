import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/Dashboard.css'; // Importing the CSS file

export function Dashboard() {
  const location = useLocation();
  const payload = location.state?.payload;

  // Parse the body to a JSON object
  const body = payload?.body ? JSON.parse(payload.body) : null;

  // Extract attributes from the parsed body
  const username = body?.user?.Username;
  const userRole = body?.user?.Role;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="user-info">
        <h2>User Information:</h2>
        <p>Username: {username}</p>
        <p>User Role: {userRole}</p>
      </div>

      {/* Conditional Rendering for Buttons */}
      <div className="buttons-container">
        {userRole === 'Site Manager' && (
          <div>
            <Link to="/sm/generate-report-total-inventory" className="dashboard-link">
              <button className="dashboard-button" style={{ backgroundColor: 'purple'}}>Report Total Inventory $$ Amount in Entire Site</button>       {/* DONE */}
            </Link>
            <br />
            
              
          <Link to="/sm/report-site-inventory-by-virtual-store">
          <button className="dashboard-button" style={{ backgroundColor: 'purple'}} >Generate report of site inventory aggregated by virtual store</button>
          </Link>
          <br /> 


          <Link to="/sm/report-total-inventory">
            <button className="dashboard-button" style={{ backgroundColor: 'purple'}}>Generate $$ report of total site inventory</button>
          </Link>
          <br />

          
          <Link to="/sm/generate-balances-for-each-store">
          <button className="dashboard-button" style={{ backgroundColor: 'purple'}}>Generate Balance For Each Virtual Store</button> 
          </Link>
          <br />

          <Link to="/sm/report-site-balance">
          <button className="dashboard-button">Report $$ Profits for Each Store And For Site Manager</button> <br /> {/* ITERATION 2 */}
          </Link>
          <br />

            <Link to="/sm/remove-store" className="dashboard-link">
              <button className="dashboard-button" style={{ backgroundColor: 'purple'}}>Remove Virtual Store</button> {/* DONE */}
            </Link>
            <br />
          </div>
        )}




        {userRole === 'Store Manager' && (
          <div>
            <Link to="/so/create-store" className="dashboard-link">
              <button className="dashboard-button" style={{ backgroundColor: 'purple' }}>Create Virtual Store</button>  {/* DONE */}
            </Link>
            <br />
            <Link to="/so/add-computer" className="dashboard-link">
              <button className="dashboard-button" style={{ backgroundColor: 'purple' }}>Add Computer To Store Inventory</button>  {/* DONE */}
            </Link>
            <br />

            <Link to="/so/modify-price" className="dashboard-link">
            <button className="dashboard-button" style={{ backgroundColor: 'orange' }}>Modify Price Of Computer In Inventory</button> <br /> {/* ITERATION 2 */}
            </Link>
          
            <Link to="/so/remove-product">
            <button className="dashboard-button" style={{ backgroundColor: 'purple' }}>Remove Computer From Inventory</button>
            </Link>
            < br/>




          <Link to="/so/generate-inventory" className="dashboard-link">
            <button className="dashboard-button" style={{ backgroundColor: 'purple' }}>Generate Inventory</button> {/* DONE */}
          </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
