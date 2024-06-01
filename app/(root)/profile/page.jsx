"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import "./profile.scss";
import { FaPlus } from "react-icons/fa6";
import user from "../../../public/assets/Avatar.png";
import Modal from "../../../components/modal/Modal";
import { toast } from "sonner";
import Link from "next/link";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");

  const [addressName, setAddressName] = useState(null);
  const [addressPhone, setAddressPhone] = useState(null);
  const [area, setArea] = useState(null);
  const [city, setCity] = useState(null);
  const [houseNo, setHouseNo] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [state, setState] = useState();

  const [address, setAddress] = useState({});

  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setAddressEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);
  const [popUp, setPopUp] = useState(false);

  const fileInputRef = useRef();
  // let userString;
  // Retrieve user data from localStorage if available
  let userString = "";
  userString = typeof window !== "undefined" ? localStorage.getItem("user") : "";
 useEffect(()=>{
     if (typeof window !== "undefined") {
    userString = localStorage.getItem("user");
  }
  const userObject = JSON.parse(userString); 
  const _id = userObject.user._id;
  const token = userObject.token;
 }, []);


  const fetchUser = async () => {
    const res = await axios.get(
      `${process.env.API_KEY}/api/v1/get/user/${_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.data.status === 1) {
      setName(res?.data?.user?.fullname);
      setEmail(res?.data?.user?.email);
      setImage(res?.data?.user?.image);
      setPhone(res?.data?.user?.phone);
      setAddress(res?.data?.user?.address);

      setAddressName(res?.data?.user?.address?.addressName);
      setAddressPhone(res?.data?.user?.address?.alternatePhone);
      setArea(res?.data?.user?.address?.area);
      setCity(res?.data?.user?.address?.city);
      setHouseNo(res?.data?.user?.address?.houseNo);
      setLandmark(res?.data?.user?.address?.landmark);
      setPincode(res?.data?.user?.address?.pincode);
      setState(res?.data?.user?.address?.state);
    }
  };

  // form function
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id", _id);

      if (image !== "") formData.append("image", image);
      if (name !== "") formData.append("fullname", name);
      if (phone !== "") formData.append("phone", phone);
      if (email !== "") formData.append("email", email);
      if (address === "") formData.append("address", address);
      if (addressName !== "") formData.append("addressName", addressName);
      if (addressPhone !== "") formData.append("alternatePhone", addressPhone);
      if (area !== "") formData.append("area", area);
      if (city !== "") formData.append("city", city);
      if (houseNo !== "") formData.append("houseNo", houseNo);
      if (landmark !== "") formData.append("landmark", landmark);
      if (pincode !== "") formData.append("pincode", pincode);
      if (state !== "") formData.append("state", state);

      const res = await axios.put(
        `${process.env.API_KEY}/api/v1/update/user/${_id}`,
        formData
      );

      if (res.data.status === 1) {
        toast.success("Profile updated.");

        setImage(res?.data?.user?.image);
        setName(res?.data?.user?.name);
        setPhone(res?.data?.user?.phone);
        setEmail(res?.data?.user?.email);

        setEditMode(false);
        fetchUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    setImage({ ...image, image: file });

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleAddAddress = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id", _id);
      if (address === "") formData.append("address", address);
      if (addressName !== "") formData.append("addressName", addressName);
      if (addressPhone !== "") formData.append("alternatePhone", addressPhone);
      if (area !== "") formData.append("area", area);
      if (city !== "") formData.append("city", city);
      if (houseNo !== "") formData.append("houseNo", houseNo);
      if (landmark !== "") formData.append("landmark", landmark);
      if (pincode !== "") formData.append("pincode", pincode);
      if (state !== "") formData.append("state", state);

      const res = await axios.put(
        `${process.env.API_KEY}/api/v1/update/user/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper content type
          },
        }
      );
      console.log(res);

      if (res.data.status === 1) {
        toast.success("Address added successfully.");

        setAddressName(res?.data?.user?.address?.addressName);
        setAddressPhone(res?.data?.user?.address?.alternatePhone);
        setArea(res?.data?.user?.address?.area);
        setCity(res?.data?.user?.address?.city);
        setHouseNo(res?.data?.user?.address?.houseNo);
        setLandmark(res?.data?.user?.address?.landmark);
        setPincode(res?.data?.user?.address?.pincode);
        setState(res?.data?.user?.address?.state);
        setPopUp(false);
        setAddressEditMode(false);
        fetchUser();
      } else {
        toast.error("Address addition failed. Please try again.");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Error adding address. Please try again.");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div className="profile_container">
        <div className="row">
          <div className="col-md-8">
            <div className="form-container">
              <h2 className="title">User Profile</h2>
              {editMode ? (
                <form className="display">
                  <div className="dp_container m-auto">
                    {image ? (
                      <Image
                        className="dp"
                        src={`${process.env.API_KEY}/uploads/${image}`}
                        width={100}
                        height={100}
                        alt="dp"
                      />
                    ) : (
                      <Image
                        className="dp"
                        src={user}
                        width={100}
                        height={100}
                        alt="dp"
                      />
                    )}
                    <button onClick={() => fileInputRef.current.click()}>
                      Upload
                    </button>
                  </div>

                  <input
                    className="hidden "
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    placeholder="DP"
                    onChange={handleFileChange}
                  />
                  <div className="input_container">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="inputName"
                      placeholder="Enter Your Name"
                      autoFocus
                    />

                    <input
                      type="email"
                      value={email}
                      id="inputEmail"
                      placeholder="Enter Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your Phone"
                    />
                    <div className="btn_container">
                      <button
                        onClick={handleUpdate}
                        type="submit"
                        className="profile_update_btn"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update"}
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="delete_btn"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="display">
                    <div className="dp_container m-auto">
                      {image && image ? (
                        <Image
                          className="dp"
                          src={`${process.env.API_KEY}/uploads/${image}`}
                          width={100}
                          height={100}
                          alt="dp"
                        />
                      ) : (
                        <Image
                          className="dp"
                          src={user}
                          width={100}
                          height={100}
                          alt="dp"
                        />
                      )}
                    </div>
                    <p>
                      <strong>Name: </strong> &nbsp; {name}
                    </p>
                    <p>
                      <strong>Email: </strong> &nbsp; {email}
                    </p>
                    <p>
                      <strong>Phone: </strong> &nbsp; {phone}
                    </p>
                    <p>
                      <Link href={"change-password"}>
                        <strong>Change Password </strong>
                      </Link>
                    </p>

                    <button
                      className="edit_btn"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
            <hr style={{ margin: "2rem" }} />
            {/*=============================================Address section=============================== */}
            <div className="form-container">
              <h2 className="title">Address</h2>
              {address ? (
                <>
                  {editAddressMode ? (
                    <form className="display">
                      <div className="input_container">
                        <input
                          type="text"
                          value={addressName}
                          onChange={(e) => setAddressName(e.target.value)}
                          id="inputName"
                          placeholder="Enter Your Name"
                          autoFocus
                        />

                        <input
                          type="number"
                          value={addressPhone}
                          onChange={(e) => setAddressPhone(e.target.value)}
                          id="inputPhone"
                          placeholder="Enter Your Phone"
                        />
                        <input
                          type="text"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          id="inputPhone"
                          placeholder="Enter Your Phone"
                        />
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          id="inputPhone"
                          placeholder="Enter Your City"
                        />
                        <input
                          type="text"
                          value={houseNo}
                          onChange={(e) => setHouseNo(e.target.value)}
                          id="inputPhone"
                          placeholder="Enter Your House No"
                        />
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          id="inputPhone"
                          placeholder="Enter Your Landmark"
                        />
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          id="inputPhone"
                          placeholder="Enter Your Pincode"
                        />
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          id="inputPhone"
                          placeholder="Enter Your State"
                        />
                        <div className="btn_container">
                          <button
                            onClick={handleAddAddress}
                            type="submit"
                            className="profile_update_btn"
                            disabled={loading}
                          >
                            {loading ? "Updating..." : "Update"}
                          </button>
                          <button
                            onClick={() => setAddressEditMode(false)}
                            className="delete_btn"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="display">
                        <p>
                          <strong>Name: </strong>&nbsp; {addressName}
                        </p>
                        <p>
                          <strong>Phone: </strong>&nbsp; {addressPhone}
                        </p>
                        <p>
                          <strong>Area: </strong>&nbsp; {area}
                        </p>
                        <p>
                          <strong>City: </strong>&nbsp; {city}
                        </p>
                        <p>
                          <strong>House No: </strong>&nbsp; {houseNo}
                        </p>
                        <p>
                          <strong>Landmark: </strong>&nbsp; {landmark}
                        </p>
                        <p>
                          <strong>Pincode: </strong> &nbsp; {pincode}
                        </p>
                        <p>
                          <strong>State: </strong> &nbsp; {state}
                        </p>

                        <button
                          className="edit_btn"
                          onClick={() => setAddressEditMode(true)}
                        >
                          Edit
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div
                    onClick={() => setPopUp(true)}
                    className="Address_container"
                  >
                    <FaPlus className="add_plus" />
                    <h1>Add Address</h1>
                  </div>
                </>
              )}
            </div>
            {/**======================Modal===================== */}
            <Modal open={popUp} onClose={() => setPopUp(!popUp)}>
              <div className="modal_container detail_modal form-container">
                <h2>Add Address</h2>
                <form className="display">
                  <div className="input_container">
                    <input
                      type="text"
                      value={addressName}
                      onChange={(e) => setAddressName(e.target.value)}
                      id="inputName"
                      placeholder="Enter Your Name"
                    />

                    <input
                      type="text"
                      value={addressPhone}
                      onChange={(e) => setAddressPhone(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your Phone"
                    />
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your Area"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your City"
                    />
                    <input
                      type="text"
                      value={houseNo}
                      onChange={(e) => setHouseNo(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your House No"
                    />
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your Landmark"
                    />
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your Pincode"
                    />
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      id="inputPhone"
                      placeholder="Enter Your State"
                    />
                    <div className="btn_container">
                      <button
                        onClick={() => setPopUp(!popUp)}
                        className="delete_btn"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddAddress}
                        type="submit"
                        className="profile_update_btn"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Add"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
