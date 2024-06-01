"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../../../../public/assets/logo_black.svg";
import "./style.scss";

import { usePathname, useRouter } from "next/navigation";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { BasicCard } from "../../../../../../components/cards/cards";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import { toast } from "sonner";
import { useAuth } from "../../../../../../context/auth";
const page = () => {
  const pathname = usePathname();
  const [service, setService] = useState([]);
  const [category, setCategoryData] = useState([]);
  const [vehicleModel, setVehicleModel] = useState([]);
  const [brandData, setBrandsData] = useState([]);
  const [singleVehicle, setSingleVehicle] = useState({});

  const [auth] = useAuth();

  const [brandId, setBrandId] = useState("");

  const providerLinksRef = useRef(null);
  const router = useRouter();

  let selectedModelId;
  if (typeof window !== "undefined") {
    selectedModelId = sessionStorage.getItem("selectedModelId");
  }
  let selectedBrandId;
  if (typeof window !== "undefined") {
    selectedBrandId = sessionStorage.getItem("selectedBrandId");
  }
  let selectedServiceId;
  if (typeof window !== "undefined") {
    selectedServiceId = sessionStorage.getItem("selectedServiceId");
  }

  const handleScroll = (scrollOffset) => {
    if (providerLinksRef.current) {
      const maxScrollLeft =
        providerLinksRef.current.scrollWidth -
        providerLinksRef.current.clientWidth;
      providerLinksRef.current.scrollLeft = Math.min(
        Math.max(providerLinksRef.current.scrollLeft + scrollOffset),
        maxScrollLeft
      );
    }
  };

  const fetchCategory = async () => {
    const res = await axios.get(`${process.env.API_KEY}/api/v1/get/category`);

    if (res.data.status == 1) {
      setCategoryData(res.data.getCategory);
    }
  };
  const fetchBrandDetails = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/brand`);

      setBrandsData(res.data.brandsData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchServiceByModel = async () => {
    const res = await axios.get(
      `${process.env.API_KEY}/api/v1/get/model/${selectedModelId}`
    );

    setService(res.data.vehicleModel.services);
    setSingleVehicle(res.data.vehicleModel);
  };

  const fetchVehicleByBrand = async () => {
    const res = await axios.get(
      `${process.env.API_KEY}/api/v1/get/brand/${selectedBrandId}`
    );

    setVehicleModel(res.data.model);
  };

  const handleLinkClick = (id, event) => {
    sessionStorage.setItem("selectedServiceId", id);
    router.push(`/providers/${id}/${selectedBrandId}/${selectedModelId}`),
      { shallow: true };
    event.stopPropagation();
  };
  const handleSelectBrandLinkClick = (id) => {
    sessionStorage.setItem("selectedBrandId", id);
    setBrandId(id);
  };
  const handleSelectModelLinkClick = (id) => {
    sessionStorage.setItem("selectedModelId", id);
    router.push(`/providers/${selectedServiceId}/${selectedBrandId}/${id}`), // Fix the route
      setSingleVehicle(id);
  };

  const addToCartHandler = async (data) => {
    try {
      const itemToAdd = {
        ...data,
        user: auth.userId,
        model: singleVehicle.name,
      };

      const res = await axios.post(
        `${process.env.API_KEY}/api/v1/add/to/cart`,
        itemToAdd
      );

      toast.success("Item Added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServiceByModel();

    fetchBrandDetails();
  }, []);
  useEffect(() => {
    fetchVehicleByBrand();
  }, [brandId]);
  useEffect(() => {
    fetchCategory();
  }, [selectedServiceId]);

  return (
    <>
      <div className="container">
        <div className="service_container">
          <nav className="nav">
            <div className="arrow left" onClick={() => handleScroll(-1000)}>
              <MdArrowBackIos />
            </div>
            <div className="provider_links" ref={providerLinksRef}>
              {category.map((link, index) => {
                const isActive = pathname.includes(link._id);
                return (
                  <div
                    className={`provider_link ${isActive && "active"}`}
                    onClick={(event) => handleLinkClick(link._id, event)}
                    key={index}
                    shallow="true"
                  >
                    <div>
                      <Image
                        src={`${process.env.API_KEY}/uploads/${link.image}`}
                        width={50}
                        height={50}
                        alt={link.name}
                      />
                    </div>
                    {link.name}
                  </div>
                );
              })}
            </div>
            <div className="arrow right" onClick={() => handleScroll(1000)}>
              <MdArrowForwardIos />
            </div>
          </nav>
          <h1>Schedule Package</h1> {/* for {`${singleVehicle.name}`}*/}
          {service.map((data, index) => {
            return (
              selectedServiceId === data.category && (
                <div key={index} className="service_card">
                  {/* {console.log(data)} */}
                  <div
                    className="imageContainer"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Image
                      src={`${process.env.API_KEY}/uploads/${data.image}`}
                      alt={data.image}
                      layout="responsive"
                      width={300}
                      height={300}
                      priority
                    />
                  </div>
                  <div className="card_content">
                    <div className="service_headers">
                      <h2>{data.name}</h2>
                      <h2>Duration: {data.duration} Hrs</h2>
                    </div>
                    <div className="description">
                      <p>{data.description}</p>
                    </div>
                    <div className="prices">
                      <h2>
                        <del style={{ color: "gray" }}>
                          &#8377; {data.price}
                        </del>
                      </h2>
                      <h2>&#8377; {data.discount}</h2>
                    </div>
                    <button
                      onClick={() => {
                        addToCartHandler(data);
                      }}
                      className="book"
                    >
                      <span className="addToCart">
                        <MdOutlineAddShoppingCart />
                      </span>
                      Add to cart{" "}
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="brand_model_container">
          {singleVehicle ? (
            // Display the selected model
            <div className="single_vehicle">
              <div className="single_card_content">
                <Image
                  className="image_vehicle"
                  src={`${process.env.API_KEY}/uploads/${singleVehicle.image}`}
                  width={100}
                  height={100}
                  alt={"Vehicle_Img"}
                  layout="responsive"
                  priority
                />
                <div className="vehicle_name">
                  <h1>{singleVehicle.name}</h1>
                  <button onClick={() => setSingleVehicle(null)}>Change</button>
                </div>
              </div>
            </div>
          ) : brandId ? (
            <>
              <div className="container_flux">
                <h2>Select Model</h2>
                <div className="card_container">
                  {vehicleModel.map((data, index) => (
                    <div
                      key={index}
                      className="card_content"
                      onClick={() => handleSelectModelLinkClick(data._id)}
                    >
                      <BasicCard
                        image={`${process.env.API_KEY}/uploads/${data.image}`}
                        alt={data.name}
                      >
                        {data.name}
                      </BasicCard>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Display brands if no brand is selected
            <>
              <div className="container_flux">
                <h2>Select Provider</h2>
                <div className="card_container">
                  {brandData.map((data, index) => (
                    <div
                      key={index}
                      className="card_content"
                      onClick={() => handleSelectBrandLinkClick(data._id)}
                    >
                      <BasicCard
                        image={`${process.env.API_KEY}/uploads/${data.image}`}
                        alt={data.name}
                      >
                        {data.name}
                      </BasicCard>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
