import React, { useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Shop } from './pages/Shop';
import { SignUp } from './pages/SignUp';
import { SiteManagerView } from './pages/SiteManagerView';
import { StoreManagerView } from './pages/StoreManagerView';
import { CreateVirtualStore } from './pages/CreateVirtualStore';
import { AddComputerToInventory } from './pages/AddComputerToInventory';
import { ModifyPriceOfComputer } from './pages/ModifyPriceOfComputer';
import { RemoveComputerFromInventory } from './pages/RemoveComputerFromInventory';
import { GenerateReportOfInventory } from './pages/GenerateReportOfInventory';
import { GenerateReport } from './pages/GenerateReport';
import { GenerateAggregatedReport } from './pages/GenerateAggregatedReport';
import { GenerateBalance } from './pages/GenerateBalance';
import { ReportProfits } from './pages/ReportProfits';
import { RemoveStore } from './pages/RemoveStore';
import { Unauthorized } from './pages/Unauthorized';

function App() {
  const userRole = null; // Change this to the actual user's role MUST START AS NULL, CHANGE WHEN USER LOGS IN............
  const navigate = useNavigate();
  //console.log("User Role:", userRole);
  const currentURL =  window.location.href;
  //console.log("Current URL:", currentURL);


  
  

  

  useEffect(() => {

    if ((userRole === 'Store Manager') && (window.location.href.includes("site-manager-view") || window.location.href.includes("sitemanagerview"))) {
      navigate('/unauthorized');
    }
    
  
    if ((userRole === 'Site Manager') && (window.location.href.includes("store-manager-view") || window.location.href.includes("storemanagerview"))) {
      navigate('/unauthorized');
    }
    
    const checkUserRoleAndNavigate = (allowedRole, routePath) => {
      if (userRole !== allowedRole) {
        console.log("User Role:", userRole);
        console.log("Allowed Role:", allowedRole);
        navigate('/unauthorized');

      }
    };

    if (userRole === 'Site Manager') {
      checkUserRoleAndNavigate('Site Manager', '/sitemanagerview');
    }

    if (userRole === 'Store Manager') {
      checkUserRoleAndNavigate('Store Manager', '/storemanagerview');
    }

    if (userRole === null) {
      checkUserRoleAndNavigate(null, '/shop');
    }



  }, [userRole, navigate]);

  return (
    <>
      <nav>
        <h1>EZConsignment v1.7</h1>
        <ul>
          {userRole === 'Site Manager' && <li><Link to="/sitemanagerview">Site Manager View</Link></li>}
          {userRole === 'Store Manager' && <li><Link to="/storemanagerview">Store Manager View</Link></li>}
          <li><Link to="/shop">Shop</Link></li>
          {userRole === null && <li><Link to="/login">Login</Link></li>}
          {userRole === null && <li><Link to="/signup">Sign Up</Link></li>}
        </ul>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/sitemanagerview" element={<SiteManagerView />} />
        <Route path="/storemanagerview" element={<StoreManagerView />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/store-manager-view/create-store" element={<CreateVirtualStore />} />
        <Route path="/store-manager-view/add-computer" element={<AddComputerToInventory />} />
        <Route path="/store-manager-view/modify-price" element={<ModifyPriceOfComputer />} />
        <Route path="/store-manager-view/remove-computer" element={<RemoveComputerFromInventory />} />
        <Route path="/store-manager-view/generate-report" element={<GenerateReportOfInventory />} />
        <Route path="/site-manager-view/generate-report" element={<GenerateReport />} />
        <Route path="/site-manager-view/generate-aggregated-report" element={<GenerateAggregatedReport />} />
        <Route path="/site-manager-view/generate-balance" element={<GenerateBalance />} />
        <Route path="/site-manager-view/report-profits" element={<ReportProfits />} />
        <Route path="/site-manager-view/remove-store" element={<RemoveStore />} />
        <Route
          path="/manager-view/*"
          element={
            userRole === 'Site Manager' ? (
              <SiteManagerView />
            ) : userRole === 'Store Manager' ? (
              <StoreManagerView />
            ) : (
              <Unauthorized />
            )
          }
        />
      </Routes>

      




    </>
  );
}

export default App;
