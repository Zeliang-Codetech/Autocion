import Link from "next/link";
import React from "react";
import "./customers.scss";

const page = () => {
  return (
    <div className="customers_container">
      <div className="customers_heading">
        <h3>Customers</h3>
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
  );
};

export default page;
