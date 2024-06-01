
import React from "react";
import "../customers.scss";

const page = () => {
  return (
    <div className="customers_container">
      <div className="customers_heading">
        <h3>Transactions</h3>
      </div>
      <hr />
      <div className="customers_heading">
        <div className="filter">
          <select>
            <option value="">Payment Method</option>
            <option value="">All</option>
            <option value="">UPI</option>
            <option value="">Card</option>
            <option value="">Cash</option>
          </select>
          {/*Date range picker */}
          <select>
            <option value="">Payment Method</option>
            <option value="">All</option>
            <option value="">UPI</option>
            <option value="">Card</option>
            <option value="">Cash</option>
          </select>
        </div>
        <input type="search" placeholder="Search" />
      </div>
      <table className="table">
        <thead>
          <tr className="table_head">
            <th>Profile</th>
            <th>Company Name</th>
            <th>Mobile</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table_body">
            <td>The Sliding</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
            <td>1961</td>
            <td>1961</td>
            <td>1961</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default page;
