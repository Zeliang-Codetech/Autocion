"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import "./style.scss";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({});
  const Router = useRouter();
  // let userString;
  // // if (typeof window !== "undefined") {
  // //   userString = localStorage.getItem("user");
  // // }
  // // const userObject = JSON.parse(userString);
  // // const _id = userObject.user._id;
  // // const token = userObject.token;

  const getCartByUser = async () => {
    try {
      if (auth && auth.token) {
        const res = await axios.get(
          `${process.env.API_KEY}/api/v1/get/user/${auth.userId}`,
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );

        setCart(res.data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  const removeItem = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.API_KEY}/api/v1/delete/cart/item/${id}`
      );
      if (res.data.status === 1) {
        toast.success(res.data.message);
        getCartByUser();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const fetchUser = async () => {
    if (auth && auth.userId) {
      try {
        const res = await axios.get(
          `${process.env.API_KEY}/api/v1/get/user/${auth.userId}`,
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        setAddress(res.data.user.address);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const checkOutHandler = async (products) => {
    try {
      if (address) {
        const Subtotal = calculateSubtotal(products);
        for (const element of products) {
          const {
            data: { order },
          } = await axios.post(
            `${process.env.API_KEY}/api/v1/payment/checkout`,
            {
              name: element.name,
              category: element.categoryName,
              provider: element.providerName,
              model: element.model,
              amount: Subtotal,
              price: element.discount,
              user: auth.fullname,
              userId: auth.userId,
              userEmail: auth.email,
              phone: auth.phone,
            }
          );

          var options = {
            key: process.env.RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
            amount: Subtotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: order.currency,
            name: "Autocion", // your business name
            description: "Test Transaction",
            order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${process.env.API_KEY}/api/v1/payment/payment/verification`,
            prefill: {
              // We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
              id: auth.userId,
              name: auth.fullname, // your customer's name
              email: auth.email,
              contact: auth.phone, // Provide the customer's phone number for better conversion rates
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          // const rzp = new window.Razorpay({ key });
          // rzp.createPayment(options); // key not required
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
        }
      } else {
        toast.error("Please add address to continue.");
        Router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCartByUser();
  }, [auth]);

  // const checkOutHandler = async (products) => {
  //   try {
  //     const Subtotal = calculateSubtotal(products);

  //     products.map(async (element) => {
  //       const {
  //         data: { order },
  //       } = await axios.post(`${process.env.API_KEY}/api/v1/payment/checkout`, {
  //         name: element.name,
  //         category: element.categoryName,
  //         provider: element.providerName,
  //         model: element.model,
  //         amount: element.discount,
  //         user: auth.fullname,
  //         userId: auth.userId,
  //         userEmail: auth.email,
  //         phone: auth.phone,
  //       });
  //       console.log(order);
  //       var options = {
  //         key: process.env.RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
  //         amount: Subtotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //         currency: order.currency,
  //         name: "Autocion", //your business name
  //         description: "Test Transaction",
  //         order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //         callback_url: `${process.env.API_KEY}/api/v1/payment/payment/verification`,
  //         prefill: {
  //           //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
  //           id: auth.userId,
  //           name: auth.fullname, //your customer's name
  //           email: auth.email,
  //           contact: auth.phone, //Provide the customer's phone number for better conversion rates
  //         },
  //         notes: {
  //           address: "Razorpay Corporate Office",
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };
  //       var rzp1 = new window.Razorpay(options);
  //       rzp1.open();
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const safetyAndWarantyFees = () => {
    if (cart.length !== 0) {
      return 99;
    } else {
      return 0;
    }
  };
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
      subtotal += parseFloat(cart[i].discount); // Convert price to a floating point number
    }
    return subtotal + safetyAndWarantyFees();
  };

  return (
    <>
      <div className="cartContainer">
        <h1>Cart</h1>

        <h2>
          {cart.length >= 1
            ? `You have ${cart.length} ${
                cart.length === 1 ? "Item" : "items"
              } in your cart
        ${auth.token ? "" : "Please login"}`
            : "Cart is empty."}
        </h2>

        <div className="cartRow">
          <div className="col-50">
            {cart.map((data, index) => {
              return (
                <div key={index} className="cartContent">
                  <div className="imageContainer">
                    <Image
                      layout="responsive"
                      src={`${process.env.API_KEY}/uploads/${data.image}`}
                      width={200}
                      height={150}
                      alt={data.name}
                    />
                  </div>
                  <div className="cardInfo">
                    <div className="cartItemHeader">
                      <h3>{data.name}</h3>
                      <h3> &#8377; {data.discount}</h3>
                    </div>

                    <p className="description"> {data.description}</p>
                    <div className="details">
                      <p>{data.categoryName}</p>
                      <p> {data.providerName}</p>
                      <p> {data.model}</p>
                    </div>

                    <button
                      className="delete_btn"
                      onClick={() => removeItem(data._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-50 checkout">
            <h1>Bill details</h1>
            <div className="sawf">
              <p>Safety & Warranty fees </p>
              {cart.length === 0 ? <p>0</p> : <p>&#8377; 99 </p>}
            </div>
            <div className="subtotal">
              <p>Subtotal</p>
              <p>&#8377; {calculateSubtotal(cart)}</p>
            </div>
            <button onClick={() => checkOutHandler(cart)}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </>
  );
};

export default page;
