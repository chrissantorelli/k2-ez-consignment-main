import './App.css';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Shop } from './pages/Shop';
import { SignUp } from './pages/SignUp';
import { SiteManagerView } from './pages/SiteManagerView';
import { StoreManagerView } from './pages/StoreManagerView';

function App() {
  return (

    <>
    <nav>
      <h1>EZConsignment v1.1</h1>
      <ul>
        <li><Link to="/sitemanagerview">Site Manager View</Link></li>
        <li><Link to="/storemanagerview">Store Manager View</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
    <hr></hr>



    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/sitemanagerview" element={<SiteManagerView />} />
      <Route path="/storemanagerview" element={<StoreManagerView />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </>
  );
}

export default App;
