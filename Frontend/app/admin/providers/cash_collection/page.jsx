"use client";
import { useEffect } from "react";
import "../providers.scss";
import axios from "axios";
const page = () => {
  useEffect(async () => {
    const res = await axios.get("http://localhost:8000/api/v1/create/service");
    console.log(res);
  }, []);
  return (
    <div className="providers_container">
      <div className="providers_heading">
        <h3>Cash collection</h3>
        <input type="search" placeholder="Search" />
      </div>
      <hr />
      <div className="providers_heading"></div>
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
