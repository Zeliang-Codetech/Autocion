"use client";
import React, { useEffect, useState } from "react";
import { BasicCard } from "../../../../components/cards/cards";
import axios from "axios";
import "./style.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const [brandData, setBrandsData] = useState([]);
  const router = useRouter();
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
    router.push(`/providers/${selectedServiceId}/${id}`);
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
            <div
              className="providers_link"
              onClick={() => handleLinkClick(data._id)}
              key={index}
            >
              <BasicCard
                key={index}
                image={`${process.env.API_KEY}/uploads/${data.image}`}
                alt={data.name}
              >
                {" "}
                <p>{data.name}</p>
              </BasicCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
