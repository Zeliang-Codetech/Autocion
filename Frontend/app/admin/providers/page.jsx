"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [brandsData, setBrandsData] = useState([]);

  const fetchBrandDetails = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/get/brand");
    console.log(res.data);
    setBrandsData(res.data.brandsData);
  };

  useEffect(() => {
    fetchBrandDetails();
  }, []);

  return (
    <div className="providers_container">
      <div className="providers_heading">
        <h3>All providers</h3>
        <button>Add Providers</button>
      </div>
      <hr />
      <div className="providers_heading">
        <div className="filter">
          <Link className="all" href={""}>
            All
          </Link>
          <Link className="approved" href={""}>
            Approved
          </Link>
          <Link className="rejected" href={""}>
            Rejected
          </Link>
        </div>
        <input type="search" placeholder="Search" />
      </div>
      <table className="table">
        <thead>
          <tr className="table_head">
            <th>S.No</th>
            <th>Profile</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brandsData.map((data, index) => (
            <tr key={index} className="table_body">
              <td>{index + 1}</td>
              <td>
                <div className="table_div">
                  <Image
                    src={`http://localhost:8000/uploads/${data.image}`}
                    alt={data.image}
                    width={60}
                    height={60}
                  />

                  {data.name}
                </div>
              </td>
              <td>{data.email}</td>
              <td>{data.mobile}</td>
              <td>
                <div
                  className={`status ${
                    data.status === "Pending" ? "pending" : "approved"
                  }`}
                >
                  {data.status}
                </div>
              </td>
              <td>1961</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
