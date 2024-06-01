import Link from "next/link";
import React from "react";
import "../customers/customers.scss";
import PrivateRoute from "../../../Routes/AdminRoute";

const page = () => {
  return (
    <PrivateRoute>
      <div className="customers_container">
        <div className="customers_heading">
          <h3>Promo Codes</h3>
          <button>Add Promo codes</button>
        </div>
        <hr />
        <div className="customers_heading">
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
    </PrivateRoute>
  );
};

export default page;
