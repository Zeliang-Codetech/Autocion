"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BasicCard } from "../../../../../components/cards/cards";
import Link from "next/link";
import "./style.scss";
import { useRouter } from "next/navigation";

const page = () => {
  const [vehicleModel, setVehicleModel] = useState([]);
  const router = useRouter();

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

    setVehicleModel(res.data.model);
  };
  useEffect(() => {
    fetchVehicleByBrand();
  }, []);

  const handleLinkClick = (id) => {
    router.push(`/providers/${selectedServiceId}/${selectedBrandId}/${id}`);
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
            <div
              className="brands_links"
              onClick={() => handleLinkClick(data._id)}
              key={index}
            >
              <BasicCard
                key={data.name}
                image={`${process.env.API_KEY}/uploads/${data.image}`}
                alt={data.name}
              >
                {data.name}
              </BasicCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
