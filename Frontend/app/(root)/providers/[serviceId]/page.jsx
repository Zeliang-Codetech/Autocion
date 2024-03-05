"use client";
import React, { useEffect, useState } from "react";
import { BasicCard } from "../../../../components/cards/cards";
import axios from "axios";
import "./providers.scss";
import Link from "next/link";

const page = () => {
  const [brandData, setBrandsData] = useState([]);
  const fetchBrandDetails = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/brand`);
      setBrandsData(res.data.brandsData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBrandDetails();
  }, []);
  const filteredBrandData = brandData.filter(
    (brand) => brand.status === "Approved"
  );
  const handleLinkClick = (id) => {
    sessionStorage.setItem("selectedBrandId", id);
  };
  let selectedServiceId;
  if (typeof window !== "undefined") {
    selectedServiceId = sessionStorage.getItem("selectedServiceId");
  }
  return (
    <div className="providers_client_container">
      <h1>Please select your brand</h1>
      <div className="providers_client_content">
        {filteredBrandData.map((data, index) => {
          return (
            <Link
              onClick={() => handleLinkClick(data._id)}
              key={index}
              href={`/providers/${selectedServiceId}/${data._id}`}
            >
              <BasicCard
                key={index}
                image={`${process.env.API_KEY}/uploads/${data.image}`}
                alt={data.name}
              >
                {" "}
                <h3>{data.name}</h3>
              </BasicCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
