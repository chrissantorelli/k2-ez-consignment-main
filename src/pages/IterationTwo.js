import React from 'react';
import { Link } from 'react-router-dom';

function IterationTwo() {
  return (
    <div>
      <h2>Functionality From Earlier Iterations</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/sm/remove-store">Remove Store</Link>
        </li>
        <li>
          <Link to="/so/add-computer">Add Computer</Link>
        </li>
        <li>
          <Link to="/so/create-store">Create Store</Link>
        </li>
        <li>
          <Link to="/so/generate-inventory">Generate Inventory</Link>
        </li>
        <li>
          <Link to="/iterationtwo">Iteration Two</Link>
        </li>

        <br></br>
        <br></br>
        <h2>Iteration Two Action Items</h2>
        <li>
          <Link to="/sm/report-dollar-balance">(SM) Report $$ balance for site manager (ITERATION TWO)</Link>
        </li>
        <li>
          <Link to="/sm/report-total-inventory">(SM) Generate $$ report of total site inventory (i.e., just a total number) (ITERATION TWO)</Link>
        </li>
        <li>
          <Link to="/sm/report-site-inventory-by-virtual-store">(SM) Generate report of site inventory aggregated by virtual store (i.e., one row for each store) (ITERATION TWO)</Link>
        </li>
        <li>
          <Link to="/so/remove-product">(SO) Remove Computer From Inventory (ITERATION TWO)</Link>
        </li>
        <li>
          <Link to="/c/list-stores">(C) List Stores (ITERATION TWO)</Link>
        </li>
        <li>
          <Link to="/c/list-stores-products">(C) Generate Inventory Report For Specific Store (ITERATION TWO)</Link>
        </li>
      </ul>
    </div>
  );
}

export default IterationTwo;
