"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BasicCard } from "../../../../../components/cards/cards";
import Link from "next/link";
import "./style.scss";

const page = () => {
  const [vehicleModel, setVehicleModel] = useState([]);

  let selectedBrandId;
  if (typeof window !== "undefined") {
    selectedBrandId = sessionStorage.getItem("selectedBrandId");
  }
  let selectedServiceId;
  if (typeof window !== "undefined") {
    selectedServiceId = sessionStorage.getItem("selectedServiceId");
  }

  const fetchVehicleByBrand = async () => {
    const res = await axios.get(
      `${process.env.API_KEY}/api/v1/get/brand/${selectedBrandId}`
    );
    console.log(res);
    setVehicleModel(res.data.model);
  };
  useEffect(() => {
    fetchVehicleByBrand();
  }, []);

  const handleLinkClick = (id) => {
    // Store the id in session storage
    sessionStorage.setItem("selectedModelId", id);
  };

  let selectedModelId;
  if (typeof window !== "undefined") {
    selectedModelId = sessionStorage.getItem("selectedModelId");
  }
  return (
    <div className="services_container" id="services">
      <h1>Select your Car Model </h1>
      <div key="services" className="services_content">
        {vehicleModel.map((data, index) => {
          return (
            <Link
              onClick={() => handleLinkClick(data._id)}
              key={index}
              href={`/providers/${selectedServiceId}/${selectedBrandId}/${data._id}`}
            >
              <BasicCard
                key={data.name}
                image={`${process.env.API_KEY}/uploads/${data.image}`}
                alt={data.name}
              >
                {data.name}
              </BasicCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
