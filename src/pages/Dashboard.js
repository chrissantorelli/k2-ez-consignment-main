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
              <button className="dashboard-button">Generate Report Of Total Site Inventory in $$</button>       {/* DONE */}
            </Link>
            <br />
            
            
            
            <button className="dashboard-button">Generate Report Of Site Inventory Aggregated By Virtual Store</button> <br /> {/* ITERATION 2 */}
            <button className="dashboard-button">Generate Balance For Each Virtual Store</button> <br /> {/* ITERATION 2 */}
            
            <button className="dashboard-button">Report $$ Profits for Each Store And For Site Manager</button> <br /> {/* ITERATION 2 */}

            
            
            <Link to="/sm/remove-store" className="dashboard-link">
              <button className="dashboard-button" style={{ backgroundColor: 'red' }}>Remove Virtual Store</button> {/* DONE */}
            </Link>
            <br />
          </div>
        )}

        {userRole === 'Store Manager' && (
          <div>
            <Link to="/so/create-store" className="dashboard-link">
              <button className="dashboard-button" style={{ backgroundColor: 'green' }}>Create Virtual Store</button>  {/* DONE */}
            </Link>
            <br />
            <Link to="/so/add-computer" className="dashboard-link">
              <button className="dashboard-button" style={{ backgroundColor: 'green' }}>Add Computer To Store Inventory</button>  {/* DONE */}
            </Link>
            <br />


            <button className="dashboard-button" style={{ backgroundColor: 'orange' }}>Modify Price Of Computer In Inventory</button> <br /> {/* ITERATION 2 */}
            <button className="dashboard-button" style={{ backgroundColor: 'red' }}>Remove Computer From Inventory</button> <br /> {/* ITERATION 2 */}




          <Link to="/so/generate-inventory" className="dashboard-link">
            <button className="dashboard-button">Generate Inventory Report</button> {/* DONE */}
          </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
