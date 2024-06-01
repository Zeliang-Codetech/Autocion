"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../components/modal/Modal";
import { Toaster, toast } from "sonner";
import camera from "../../../public/assets/camera.svg";
import PrivateRoute from "../../../Routes/AdminRoute";

const page = () => {
  const [popUpAdd, setPopUpAdd] = useState(false);
  const [popUpDetails, setPopUpDetails] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);

  const [data, setData] = useState({
    //for submitting
    name: "",
    image: "",
    mobile: "",
    email: "",
  });

  const [singleData, setSingleData] = useState({});
  const [brandData, setBrandsData] = useState([]);

  const [id, setId] = useState("");
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

  const toggleAdd = () => {
    setData({
      name: "",
      image: "",
      mobile: "",
      email: "",
    });
    setPreview(null);
    setPopUpAdd(!popUpAdd);
  };
  const toggleEdit = async (id) => {
    setPopUpEdit(!popUpEdit);
    setId(id);
    await fetchSingleBrand(id);
  };
  const toggleDetails = (id) => {
    setPopUpDetails(!popUpDetails);
    setId(id);
  };
  const toggleDelete = (id) => {
    setPopUpDelete(!popUpDelete);
    setId(id);
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const newValue = e.target.value;
    setData({ ...data, [fieldName]: newValue });
  };

  const handleEditChange = (e) => {
    setSingleData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = (e) => {
    const [file] = e.target.files;
    setData({ ...data, image: file });

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  const handleFileEditChange = (e) => {
    const [file] = e.target.files;
    setSingleData((prev) => ({ ...prev, image: file }));

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const fetchSingleBrand = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_KEY}/api/v1/get/brand/${id}`
      );
      setSingleData(res.data.response);
    } catch (error) {
      console.log(error);
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formdata.append(key, value);
      });

      const submit = await axios.post(
        `${process.env.API_KEY}/api/v1/create/brand`,
        formdata
      );
      if (submit.data.status === 1) {
        toast.success("Provider details added successfully.");
      }
      fetchBrandDetails();
      setData({
        name: "",
        image: "",
        mobile: "",
        email: "",
      });
      toggleAdd();
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusUpdate = (newStatus) => {
    return async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(
          `${process.env.API_KEY}/api/v1/update/brand/${id}`,
          { ...singleData, status: newStatus }
        );

        if (response.data.status === 1) {
          toast.success("Provider status updated successfully.");
          setSingleData({ ...singleData, status: newStatus });
          fetchBrandDetails();
        } else {
          toast.error("Update failed. Please try again.");
        }
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };
  };

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(
        `${process.env.API_KEY}/api/v1/delete/brand/${_id}`
      );

      if (res.data.status === 1) {
        toast.success(`Provider has been deleted.`);
      }
      fetchBrandDetails();
      toggleDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id", singleData._id);

      if (singleData.name !== "") {
        formData.append("name", singleData.name);
      }
      if (singleData.image !== "") {
        formData.append("image", singleData.image);
      }
      if (singleData.mobile !== "") {
        formData.append("mobile", singleData.mobile);
      }
      if (singleData.email !== "") {
        formData.append("email", singleData.email);
      }
      if (singleData.status !== "") {
        formData.append("status", singleData.status);
      }

      const response = await axios.put(
        `${process.env.API_KEY}/api/v1/update/brand/${singleData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === 1) {
        toast.success("Provider details updated successfully.");
        fetchBrandDetails();
        toggleEdit();
      } else {
        toast.error("Provider details update failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrandDetails();
  }, []);
  useEffect(() => {
    fetchSingleBrand();
  }, [id]);

  return (
    <PrivateRoute>
      <div className="providers_container">
        <div className="providers_heading">
          <h3>All providers</h3>
          <button onClick={toggleAdd}>Add Providers</button>
        </div>
        <hr />
        <div className="providers_heading">
          <div className="filter">
            <Link className="all" href={""}>
              All
            </Link>
            <Link className="approved" href={""}>
              Approved
            </Link>
            <Link className="rejected" href={""}>
              Rejected
            </Link>
          </div>
          <input type="search" placeholder="Search" />
        </div>
        <table className="table">
          <thead>
            <tr className="table_head">
              <th>S.No</th>
              <th>Profile</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brandData.map((data, index) => (
              <tr key={index} className="table_body">
                <td onClick={() => toggleDetails(data._id)}>{index + 1}</td>
                <td onClick={() => toggleDetails(data._id)}>
                  <div className="table_div">
                    <Image
                      className="logo_providers"
                      src={`${process.env.API_KEY}/uploads/${data.image}`}
                      alt={data.image}
                      width={50}
                      height={50}
                      priority={true}
                    />

                    {data.name}
                  </div>
                </td>
                <td onClick={() => toggleDetails(data._id)}>{data.email}</td>
                <td onClick={() => toggleDetails(data._id)}>{data.mobile}</td>
                <td onClick={() => toggleDetails(data._id)}>
                  <div
                    className={`status ${
                      data.status === "Pending" || data.status === "Rejected"
                        ? "red_bg "
                        : "green_bg"
                    }`}
                  >
                    {data.status}
                  </div>
                </td>
                <td>
                  <div className="action_btn">
                    <button
                      className="delete_btn"
                      onClick={() => toggleDelete(data._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="edit_btn"
                      onClick={() => toggleEdit(data._id)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {/*Modal for add providers */}
          <Modal open={popUpAdd} onClose={toggleAdd}>
            <div className="modal_container">
              <h1>Add Providers</h1>
              <div className="details_logo">
                {preview === null ? (
                  <Image
                    className="logo_providers"
                    src={camera}
                    alt={"brand_logo"}
                    width={150}
                    height={150}
                    priority={true}
                  />
                ) : (
                  <Image
                    className="logo_providers"
                    src={preview}
                    alt={"brand_logo"}
                    width={150}
                    height={150}
                    priority={true}
                  />
                )}
                <div className="change_btn">
                  <button onClick={() => fileInputRef.current.click()}>
                    Upload
                  </button>
                </div>
              </div>
              <form className="modal_form" action="">
                <label htmlFor="Name">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <input
                  className="hidden modal_input"
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  placeholder="Brand logo"
                  onChange={handleFileChange}
                />

                <label htmlFor="Mobile">
                  Mobile<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="number"
                  name="mobile"
                  placeholder="Mobile"
                  onChange={handleChange}
                />
                <label htmlFor="Email">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
                <div className="form_btn">
                  <button onClick={toggleAdd}>Cancel</button>
                  <button onClick={(e) => handleSubmit(e)}>Submit</button>
                </div>
              </form>
            </div>
          </Modal>

          {/*Modal for Edit provider */}
          <Modal open={popUpEdit} onClose={toggleEdit}>
            <div className="modal_container">
              <div className="details_logo">
                {preview === null ? (
                  <Image
                    className="logo_providers"
                    src={`${process.env.API_KEY}/uploads/${
                      singleData && singleData.image
                    }`}
                    alt={singleData && singleData.image}
                    width={150}
                    height={150}
                    priority={true}
                  />
                ) : (
                  <>
                    <Image
                      className="logo_providers"
                      src={preview}
                      alt={singleData && singleData.image}
                      width={150}
                      height={150}
                      priority={true}
                    />
                  </>
                )}
              </div>
              <div className="change_btn">
                <button onClick={() => fileInputRef.current.click()}>
                  Change
                </button>
              </div>

              <form className="modal_form" action="">
                <label htmlFor="Name">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={singleData && singleData.name}
                  onChange={handleEditChange}
                />

                <input
                  className="hidden modal_input"
                  type="file"
                  name="image"
                  placeholder="Brand logo"
                  ref={fileInputRef}
                  onChange={(e) => {
                    handleFileEditChange(e);
                  }}
                />

                <label htmlFor="Mobile">
                  Mobile<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="number"
                  name="mobile"
                  placeholder="Mobile"
                  value={singleData && singleData.mobile}
                  onChange={handleEditChange}
                />
                <label htmlFor="Email">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={singleData && singleData.email}
                  onChange={handleEditChange}
                />
                <div className="form_btn">
                  <button onClick={(e) => handleUpdate(e)}>Update</button>
                </div>
              </form>
            </div>
          </Modal>
          {/*Modal for provider details */}
          <Modal open={popUpDetails} onClose={toggleDetails}>
            <div className="modal_container detail_modal">
              {singleData ? (
                <h1>{singleData && singleData.name}</h1>
              ) : (
                <p>Loading Data</p>
              )}
              <hr />
              <div className="details_logo">
                <Image
                  className="logo_providers"
                  src={`${process.env.API_KEY}/uploads/${
                    singleData && singleData.image
                  }`}
                  alt="logo"
                  width={150}
                  height={150}
                  priority={true}
                />
              </div>
              <hr />
              <h3>ID: {singleData && singleData._id}</h3>
              <hr />
              <h3>Email: {singleData && singleData.email}</h3>
              <hr />
              <h3>Mobile: {singleData && singleData.mobile}</h3>
              <hr />
              <div className="status">
                <p
                  className={` ${
                    singleData &&
                    (singleData.status === "Pending" ||
                      singleData.status === "Rejected")
                      ? "red_bg"
                      : "green_bg"
                  }`}
                >
                  Status: {singleData && singleData.status}
                </p>
              </div>
              <hr />
              {singleData && singleData.status && (
                <div className="action_btn">
                  <button
                    className="ml delete_btn"
                    onClick={handleStatusUpdate("Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleStatusUpdate("Approved")}
                    className="edit_btn"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          </Modal>
          {/*Modal for delete confirmation */}
          <Modal open={popUpDelete} onClose={toggleDelete}>
            <div className="modal_container detail_modal">
              <h2 style={{ textAlign: "center", paddingBottom: "1rem" }}>
                Are you sure you want to delete {singleData && singleData.name}?
              </h2>

              <div className="action_btn">
                <button className="delete_btn" onClick={toggleDelete}>
                  No
                </button>
                <button
                  onClick={() => handleDelete(singleData && singleData._id)}
                  className="edit_btn"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>
          <Toaster
            toastOptions={{ className: "toast" }}
            position="top-center"
            richColors="true"
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default page;
