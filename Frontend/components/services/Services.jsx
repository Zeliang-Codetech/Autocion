"use client";
import Image from "next/image";
import "./Services.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BasicCard } from "../cards/cards";

const Services = () => {
  const [serviceData, setServiceData] = useState([]);

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/get/service");

    if (res.data.status == 1) {
      console.log(res.data);
      setServiceData(res.data.getService);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  // const serviceData = [
  //   {
  //     id: "1",
  //     image: "/assets/periodic.svg",
  //     title: "Periodic Service",
  //   },
  //   {
  //     id: "2",
  //     image: "/assets/mechanical.svg",
  //     title: "Mechanical Issues",
  //   },
  //   {
  //     id: "3",
  //     image: "/assets/AC.svg",
  //     title: "Ac repair & Service",
  //   },
  //   {
  //     id: "4",
  //     image: "/assets/denting-painting.svg",
  //     title: "Denting & Painting",
  //   },
  //   {
  //     id: "5",
  //     image: "/assets/Cleaning.svg",
  //     title: "Cleaning & Detailing",
  //   },
  //   {
  //     id: "6",
  //     image: "/assets/clutch.svg",
  //     title: "Clutch & Fitments",
  //   },
  //   {
  //     id: "7",
  //     image: "/assets/Battery.svg",
  //     title: "Battery",
  //   },
  //   {
  //     id: "8",
  //     image: "/assets/wheels.svg",
  //     title: "Wheels & Tyres",
  //   },
  // ];

  return (
    <div className="services_container" id="services">
      <h1>OUR SERVICES</h1>
      <div key="services" className="services_content">
        {serviceData.map((data) => {
          return (
            <BasicCard
              key={data.name}
              image={`http://localhost:8000/uploads/${data.image}`}
              alt={data.name}
            >
              {data.name}
            </BasicCard>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
