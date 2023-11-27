import './App.css';
import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Shop } from './pages/Shop';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { AddTotalInventory } from './pages/sm/AddTotalInventory';
import { RemoveStore } from './pages/sm/RemoveStore';
import { AddComputer } from './pages/so/AddComputer';
import { CreateStore } from './pages/so/CreateStore';
import { GenerateInventory } from './pages/so/GenerateInventory';

import { ReportDollarBalance } from './pages/sm/ReportDollarBalance';
import { DollarReportOfSiteInventoryByVirtualStore } from './pages/sm/DollarReportOfSiteInventoryByVirtualStore';
import { ReportTotalInventory } from './pages/sm/ReportTotalInventory';
import ListStores from './pages/sm/listStores';
import { RemoveProduct } from './pages/so/removeProduct';
import ListStoresProducts from './pages/sm/ListStoresProducts';

function App() {
  const location = useLocation();  

  const isDashboardPage = location.pathname === '/dashboard';
  

  return (
    <>
      <nav>
        <h1>EZConsignment</h1>
        <ul>
          <li><Link to="/shop">Shop</Link></li>
          {isDashboardPage ? (
            <li><Link to="/logout">Logout</Link></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
      <hr />

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/sm/generate-report-total-inventory" element={<AddTotalInventory />} />
        <Route path="/sm/remove-store" element={<RemoveStore />} />

        <Route path="/sm/report-dollar-balance" element={<ReportDollarBalance /> } />
        <Route path="/sm/report-site-inventory-by-virtual-store" element={<DollarReportOfSiteInventoryByVirtualStore />} />
        <Route path="/sm/report-total-inventory" element={<ReportTotalInventory />} />


        <Route path="/c/list-stores" element={<ListStores />} />
        <Route path="/c/list-stores-products" element={<ListStoresProducts />} />



        <Route path="/so/remove-product" element={<RemoveProduct />} />

        <Route path="/so/add-computer" element={<AddComputer />} />
        <Route path="/so/create-store" element={<CreateStore />} />
        <Route path="/so/generate-inventory" element={<GenerateInventory />} />



      </Routes>
    </>
  );
}

function Logout() {
  const navigate = useNavigate(); 

  // prevents backtracking
  useEffect(() => {
    navigate('/shop');
  }, [navigate]);
  
  return <div>Logged out successfully</div>;
}

export default App;
