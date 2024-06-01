"use client";
import Image from "next/image";
import "./Services.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BasicCard } from "../cards/cards";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();

  const [serviceData, setServiceData] = useState([]);

  const fetchServices = async () => {
    const res = await axios.get(`${process.env.API_KEY}/api/v1/get/category`);

    if (res.data.status == 1) {
      setServiceData(res.data.getCategory);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const handleLinkClick = (id) => {
    // Store the id in session storage
    router.push(`/providers/${id}`);

    sessionStorage.setItem("selectedServiceId", id);
  };
  return (
    <div className="services_container">
      <h1>OUR SERVICES</h1>
      <div className="services_content">
        {serviceData.map((data, index) => {
          return (
            <div
              className="service_link"
              key={index}
              onClick={() => handleLinkClick(data._id)}
            >
              <BasicCard
                image={`http://localhost:8000/uploads/${data.image}`}
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

export default Services;
