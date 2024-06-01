"use client";
import "../providers/providers.scss";
import PrivateRoute from "../../../Routes/AdminRoute";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "../../../components/modal/Modal";
import "./style.scss";
const page = () => {
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState({});
  const [popUp, setPopUp] = useState(false);

  const getOrders = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/orders`);
      setOrder(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const token = Cookies.get("admin");

  const getAddress = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.API_KEY}/api/v1/get/user/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPopUp(!popUp);
      setAddress(res.data.user.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <PrivateRoute>
      <div className="providers_container">
        <h3>Orders</h3>
        <div className="providers_heading">
          <select name="" id="">
            <option value="">Awaiting</option>
            <option value="">Confirmed</option>
            <option value="">Rescheduled</option>
            <option value="">Cancelled</option>
            <option value="">Completed</option>
          </select>
          <input type="search" placeholder="Search" />
        </div>
        <hr />
        <div className="providers_heading"></div>
        <table className="table">
          <thead>
            <tr className="table_head">
              <th>User</th>
              <th>Service Name</th>
              <th>Amount paid</th>
              <th>Category</th>
              <th>Model</th>
              <th>Provider</th>
              <th>Order ID</th>
              <th>Payment ID</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {order.map((data, index) => {
              return (
                <tr key={index} className="table_body">
                  <td>{data.user}</td>
                  <td>{data.name}</td>
                  <td>{data.amount}</td>
                  <td>{data.category}</td>
                  <td>{data.provider}</td>
                  <td>{data.model}</td>
                  <td>{data.order_id}</td>
                  <td>{data.razorpay_payment_id}</td>
                  <td
                    className="addressAnchor"
                    onClick={() => getAddress(data.userId)}
                  >
                    View Address
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal open={popUp} onClose={() => setPopUp(false)}>
        <>
          <div className="addressModal">
            <h1>Address details</h1>
            <hr />
            <p>Name: {address.addressName}</p>
            <hr />
            <p>Phone: {address.alternatePhone}</p>
            <hr />
            <p>Pincode: {address.pincode}</p>
            <hr />
            <p>Area: {address.area}</p>
            <hr />
            <p>Landmark: {address.landmark}</p>
            <hr />
            <p>City: {address.city}</p>
            <hr />
            <p>State: {address.state}</p>
          </div>
        </>
      </Modal>
    </PrivateRoute>
  );
};

export default page;
