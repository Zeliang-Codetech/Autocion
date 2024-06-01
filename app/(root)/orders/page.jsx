"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import "./style.scss";
const page = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get day name
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[date.getDay()];

    // Get formatted date (YYYY-MM-DD)
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-`;

    return `${formattedDate}-${date.getFullYear()}, ${dayName}`;
  };
  const fetchOrdersByUser = async () => {
    try {
      if (auth && auth.userId) {
        const res = await axios.get(
          `${process.env.API_KEY}/api/v1/get/user/${auth.userId}`
        );

        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersByUser();
  }, [auth]);
  return (
    <>
      <div className="orderContainer">
        <div className="orderHeader">
          <h1>My Orders</h1>
        </div>
        <div className="orderContent">
          {orders === null ? (
            ""
          ) : (
            <>
              {orders.map((data, index) => {
                return (
                  <div key={index}>
                    {data.razorpay_signature === null ? (
                      ""
                    ) : (
                      <>
                        <div className="orderCard">
                          <div className="orderCardHeader">
                            <div>
                              <p>ORDER PLACED</p>
                              <p>{formatDate(data.createdAt)}</p>
                            </div>
                            <div>
                              <p>AMOUNT</p>
                              <p> &#8377; {data.price}.00</p>
                            </div>
                            <div>
                              <p>ORDER ID</p>
                              <p>{data.order_id}</p>
                            </div>
                            <div>
                              <p>Payment ID:</p>
                              <p>{data.razorpay_payment_id}</p>
                            </div>
                          </div>
                          <div className="orderCardBody">
                            <div className="orderDetails">
                              <span>Category:</span>
                              <p>{data.category}</p>
                            </div>
                            <div className="orderDetails">
                              <span>Service:</span>
                              <p>{data.name}</p>
                            </div>
                            <div className="orderDetails">
                              <span>Model:</span>
                              <p>{data.model}</p>
                            </div>
                            <div className="orderDetails">
                              <span>Brand:</span>
                              <p>{data.provider}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default page;
