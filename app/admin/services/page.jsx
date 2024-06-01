"use client";
import "../providers/providers.scss";
import "../categories/categories.scss";
import "./service.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import PrivateRoute from "../../../Routes/AdminRoute";
import Modal from "../../../components/modal/Modal";

const page = () => {
  const [popUpDelete, setPopUpDelete] = useState(false);

  const [popUpDetails, setPopUpDetails] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);

  const [providerData, setProviderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [preview, setPreview] = useState(null);

  const [serviceData, setServiceData] = useState([]);
  const [singleServiceData, setSingleServiceData] = useState({});

  const [data, setData] = useState({
    provider: "",
    category: "",
    model: "",
    name: "",
    tags: "",
    description: "",
    image: "",
    duration: "",
    members: "",
    tax: "",
    taxPercent: "",
    price: "",
    discount: "",
    cancelable: "",
    payLater: "",
    status: "",
  });

  const [id, setId] = useState("");

  const toggleDelete = (id) => {
    setPopUpDelete(!popUpDelete);
    setId(id);
  };
  const toggleDetails = (id) => {
    setPopUpDetails(!popUpDetails);
    setId(id);
  };
  // const toggleEdit = async (id) => {
  //   setPopUpEdit(!popUpEdit);
  //   setId(id);
  //   await fetchSingleService(id);
  // };

  const fetchServiceData = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/service`);
      console.log(res);
      setServiceData(res.data.getService);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleService = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_KEY}/api/v1/get/service/${id}`
      );

      setSingleServiceData(res.data.service);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    setData({ ...data, image: file });

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value);
        }
      });
      // Append the image file to the formData object
      formData.append("image", data.image);

      const res = await axios.post(
        `${process.env.API_KEY}/api/v1/create/service`,
        formData
      );
      console.log(res);
      if (res.data.status === 1) {
        toast.success("Service details added successfully.");
        setData({
          provider: "",
          category: "",
          model: "",
          name: "",
          tags: "",
          description: "",
          image: "",
          duration: "",
          members: "",
          tax: "",
          taxPercent: "",
          price: "",
          discount: "",
          cancelable: "",
          payLater: "",
          status: "",
        });
        fetchServiceData();
      }
    } catch (error) {
      console.error("Error:", error);

      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.API_KEY}/api/v1/delete/service/${id}`
      );
      console.log(id);
      if (res.data.status === 1) {
        toast.success(`Service has been deleted.`);
      }
      fetchServiceData();
      toggleDelete();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const fetchProviderData = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/brand`);

      setProviderData(res.data.brandsData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/category`);

      setCategoryData(res.data.getCategory);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchModel = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/model`);

      setModelData(res.data.vehicleModels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviderData();
    fetchCategory();
    fetchServiceData();
    fetchModel();
  }, []);
  useEffect(() => {
    fetchSingleService();
  }, [id]);

  return (
    <PrivateRoute>
      <div className="service_container">
        <h3>Services</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="service_form_row">
            <div className="service_form_col">
              <h4>Add service details</h4>
              <div className="input_row">
                <select
                  name="provider"
                  value={data.provider}
                  onChange={handleChange}
                >
                  <option value="">Select provider</option>
                  {providerData.map((data, index) => {
                    return (
                      <option value={data._id} key={index}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categoryData.map((data, index) => {
                    return (
                      <option value={data._id} key={index}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
                <select name="model" value={data.model} onChange={handleChange}>
                  <option value="">Select Model</option>
                  {modelData.map((data, index) => {
                    return (
                      <option value={data._id} key={index}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input_row">
                <input
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Title of the service"
                />
                <input
                  name="tags"
                  value={data.tags}
                  onChange={handleChange}
                  type="text"
                  placeholder="Tags"
                />
              </div>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                cols="30"
                rows="10"
                placeholder="Description"
              ></textarea>
              <input
                type="file"
                name="image"
                placeholder="Brandlogo"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className="service_form_col">
              <h4>Perform task</h4>

              <input
                value={data.duration}
                onChange={handleChange}
                name="duration"
                type="number"
                placeholder="Duration"
              />
              <input
                value={data.members}
                name="members"
                onChange={handleChange}
                type="text"
                placeholder="Members required to perform task "
              />
            </div>
          </div>
          <div className="service_form_row">
            <div className="service_form_col">
              <h4>Price details</h4>
              <div className="input_row">
                <select name="tax" onChange={handleChange}>
                  <option value={""}>Tax</option>
                  <option value={"TaxExcluded"}>Tax excluded</option>
                  <option value={"TaxIncluded"}>Tax included</option>
                </select>
                <select
                  name="taxPercent"
                  value={data.taxPercent}
                  onChange={handleChange}
                >
                  <option>Select tax %</option>
                  <option value="5">GST (5%)</option>
                  <option name="9%" value="9">
                    GST (9%)
                  </option>
                  <option value="12">GST (12%)</option>
                  <option value="18">GST (18%)</option>
                  <option value="28">GST (28%)</option>
                </select>
                <input
                  value={data.price}
                  onChange={handleChange}
                  name="price"
                  place="price"
                  type="text"
                  placeholder="Price"
                />
                <input
                  value={data.discount}
                  onChange={handleChange}
                  type="text"
                  name="discount"
                  placeholder="Discounted Price"
                />
              </div>
            </div>
          </div>
          <div className="service_form_row">
            <div className="service_form_col">
              <h4>Service options</h4>
              <div className="input_row">
                <div className="service_checkbox">
                  <input
                    type="checkbox"
                    name="cancelable"
                    value="Cancelable"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Cancelable</label>
                </div>
                <div className="service_checkbox">
                  <input
                    type="checkbox"
                    name="payLater"
                    value="Pay Later"
                    onChange={handleChange}
                  />
                  <label htmlFor="">Pay later</label>
                </div>
              </div>
            </div>
          </div>
          <button type="Submit">Save</button>
        </form>
        <div className="categories_container">
          <div className="providers_container">
            <h3>All services</h3>
            <div className="providers_heading">
              <input type="search" placeholder="Search" />
            </div>
            <hr />
            <div className="providers_heading"></div>
            <table className="table">
              <thead>
                <tr className="table_head">
                  <th>S.No</th>
                  <th>Provider</th>
                  <th>Category</th>
                  <th>Name</th>

                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((data, index) => (
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
                        />
                      </div>
                      {data.name}
                    </td>
                    <td onClick={() => toggleDetails(data._id)}>
                      {" "}
                      {data.providerName}
                    </td>
                    <td onClick={() => toggleDetails(data._id)}>
                      {" "}
                      {data.categoryName}
                    </td>

                    <td onClick={() => toggleDetails(data._id)}>
                      <div
                        className={`status ${
                          data.status === "Unactive" ? "red_bg" : "green_bg"
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

                        {/* <button
                          className="edit_btn"
                          onClick={() => toggleEdit(data._id)}
                        >
                          Edit
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal open={popUpDelete} onClose={toggleDelete}>
        <div className="modal_container detail_modal">
          <h2 style={{ textAlign: "center", paddingBottom: "1rem" }}>
            Are you sure you want to delete{" "}
            {singleServiceData && singleServiceData.name}?
          </h2>

          <div className="action_btn">
            <button className="delete_btn" onClick={toggleDelete}>
              No
            </button>
            <button
              onClick={() =>
                handleDelete(singleServiceData && singleServiceData._id)
              }
              className="edit_btn"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      {/*Modal for category details */}
      <Modal open={popUpDetails} onClose={toggleDetails}>
        <div className="modal_container detail_modal">
          {singleServiceData ? (
            <h1>{singleServiceData && singleServiceData.name}</h1>
          ) : (
            <p>Loading Data</p>
          )}
          <hr />
          <div className="details_logo">
            <Image
              className="logo_providers"
              src={`${process.env.API_KEY}/uploads/${
                singleServiceData && singleServiceData.image
              }`}
              alt="logo"
              width={150}
              height={150}
            />
          </div>
          <hr />
          <h3>ID: {singleServiceData && singleServiceData._id}</h3>
          <hr />
          <p>
            Tags: <strong>{singleServiceData && singleServiceData.tags}</strong>
          </p>
          <hr />
          <p>
            Provider:{" "}
            <strong>
              {singleServiceData && singleServiceData.providerName}
            </strong>
          </p>
          <hr />
          <p>
            Category:{" "}
            <strong>
              {singleServiceData && singleServiceData.categoryName}
            </strong>
          </p>
          <hr />
          <p>
            Description:{" "}
            <strong>
              {singleServiceData && singleServiceData.description}
            </strong>
          </p>
          <hr />
          <p>
            Duration:{" "}
            <strong>{singleServiceData && singleServiceData.duration}</strong>
          </p>
          <hr />
          <p>
            Tax: <strong>{singleServiceData && singleServiceData.tax}</strong>
          </p>
          <hr />
          <p>
            Tax Percent:{" "}
            <strong>{singleServiceData && singleServiceData.taxPercent}</strong>
          </p>
          <hr />
          <p>
            Price:{" "}
            <strong>{singleServiceData && singleServiceData.price}</strong>
          </p>
          <hr />
          <p>
            Discounted Price:{" "}
            <strong>{singleServiceData && singleServiceData.discount}</strong>
          </p>
          <div className="status">
            <h3
              className={` ${
                singleServiceData && singleServiceData.status === "Unactive"
                  ? "red_bg"
                  : "green_bg"
              }`}
            >
              Status: {singleServiceData && singleServiceData.status}
            </h3>
          </div>
          <hr />
        </div>
      </Modal>
    </PrivateRoute>
  );
};

export default page;
