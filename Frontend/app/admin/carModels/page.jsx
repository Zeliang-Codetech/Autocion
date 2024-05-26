"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../components/modal/Modal";
import { Toaster, toast } from "sonner";
import camera from "../../../public/assets/camera.svg";
import PrivateRoute from "../../../Routes/AdminRoute";
import "../providers/providers.scss";

const page = () => {
  const [popUpAdd, setPopUpAdd] = useState(false);
  const [popUpDetails, setPopUpDetails] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);

  const [data, setData] = useState({
    name: "",
    image: "",
    brand: "",
  });

  const [singleData, setSingleData] = useState({
    _id: "",
    name: "",
    image: "",
    brand: "",
  });

  const [brandData, setBrandsData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);

  const [id, setId] = useState("");
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

  const toggleAdd = () => {
    setData({
      name: "",
      image: "",
      brand: "",
    });
    setPreview(null);
    setPopUpAdd(!popUpAdd);
  };

  const toggleEdit = async (id) => {
    setPopUpEdit(!popUpEdit);
    setId(id);
    await fetchSingleModel(id);
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
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSingleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData({ ...data, image: file });

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleFileEditChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSingleData((prev) => ({ ...prev, image: file }));

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const fetchSingleModel = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.API_KEY}/api/v1/get/model/${id}`
      );
      if (res.data?.vehicleModel) {
        setSingleData(res.data.vehicleModel);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrandDetails = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/brand`);
      if (res.data?.brandsData) {
        setBrandsData(res.data.brandsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVehicleData = async () => {
    try {
      const res = await axios.get(`${process.env.API_KEY}/api/v1/get/model`);
      if (res.data?.vehicleModels) {
        setVehicleData(res.data.vehicleModels);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formdata.append(key, value);
      });

      const submit = await axios.post(
        `${process.env.API_KEY}/api/v1/create/model`,
        formdata
      );
      if (submit.data?.status === 1) {
        toast.success("Car Model added successfully.");
        fetchVehicleData();
        toggleAdd();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.API_KEY}/api/v1/delete/model/${id}`
      );
      if (res.data?.status === 1) {
        toast.success("Model has been deleted.");
        fetchVehicleData();
        toggleDelete();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", singleData._id);

      if (singleData.name) {
        formData.append("name", singleData.name);
      }
      if (singleData.image) {
        formData.append("image", singleData.image);
      }
      if (singleData.brand) {
        formData.append("brand", singleData.brand);
      }

      const response = await axios.put(
        `${process.env.API_KEY}/api/v1/update/model/${singleData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data?.status === 1) {
        toast.success("Model updated successfully.");
        fetchVehicleData();
        toggleEdit();
      } else {
        toast.error("Model update failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBrandDetails();
    fetchVehicleData();
  }, []);

  useEffect(() => {
    if (id) {
      fetchSingleModel(id);
    }
  }, [id]);

  return (
    <PrivateRoute>
      <div className="providers_container">
        <div className="providers_heading">
          <h3>All providers</h3>
          <button onClick={toggleAdd}>Add Car Model</button>
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
              <th>Provider</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.map((data, index) => (
              <tr key={data._id} className="table_body">
                <td onClick={() => toggleDetails(data._id)}>{index + 1}</td>
                <td onClick={() => toggleDetails(data._id)}>
                  <div className="table_div">
                    <Image
                      className="logo_providers"
                      src={`${process.env.API_KEY}/uploads/${data.image}`}
                      alt={data.name}
                      width={50}
                      height={50}
                      priority={true}
                    />
                    {data.name}
                  </div>
                </td>
                <td onClick={() => toggleDetails(data._id)}>{data.brandName}</td>
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
          {/* Modal for add providers */}
          <Modal open={popUpAdd} onClose={toggleAdd}>
            <div className="modal_container">
              <h1>Add Car Model</h1>
              <div className="details_logo">
                {preview ? (
                  <Image
                    className="logo_providers"
                    src={preview}
                    alt="brand_logo"
                    width={150}
                    height={150}
                    priority={true}
                  />
                ) : (
                  <Image
                    className="logo_providers"
                    src={camera}
                    alt="brand_logo"
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
              <form className="modal_form" onSubmit={handleSubmit}>
                <label htmlFor="brand">
                  Provider<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  onChange={handleChange}
                  className="modal_input"
                  name="brand"
                  value={data.brand}
                  required
                >
                  <option value="">Select the provider</option>
                  {brandData.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="name">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="hidden modal_input"
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <div className="form_btn">
                  <button type="button" onClick={toggleAdd}>
                    Cancel
                  </button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </Modal>

          {/* Modal for Edit provider */}
          <Modal open={popUpEdit} onClose={toggleEdit}>
            <div className="modal_container">
              <div className="details_logo">
                {preview ? (
                  <Image
                    className="logo_providers"
                    src={preview}
                    alt={singleData.name}
                    width={150}
                    height={150}
                    priority={true}
                  />
                ) : (
                  <Image
                    className="logo_providers"
                    src={`${process.env.API_KEY}/uploads/${singleData.image}`}
                    alt={singleData.name}
                    width={150}
                    height={150}
                    priority={true}
                  />
                )}
                <div className="change_btn">
                  <button onClick={() => fileInputRef.current.click()}>
                    Change
                  </button>
                </div>
              </div>

              <form className="modal_form" onSubmit={handleUpdate}>
                <label htmlFor="brand">
                  Provider<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  onChange={handleEditChange}
                  className="modal_input"
                  name="brand"
                  value={singleData.brand}
                  required
                >
                  <option value="">Select the provider</option>
                  {brandData.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="name">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="modal_input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={singleData.name}
                  onChange={handleEditChange}
                  required
                />

                <input
                  className="hidden modal_input"
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleFileEditChange}
                />

                <div className="form_btn">
                  <button type="button" onClick={toggleEdit}>
                    Cancel
                  </button>
                  <button type="submit">Update</button>
                </div>
              </form>
            </div>
          </Modal>

          {/* Modal for provider details */}
          <Modal open={popUpDetails} onClose={toggleDetails}>
            <div className="modal_container detail_modal">
              {singleData ? (
                <>
                  <h1>{singleData.name}</h1>
                  <hr />
                  <div className="details_logo">
                    <Image
                      className="logo_providers"
                      src={`${process.env.API_KEY}/uploads/${singleData.image}`}
                      alt={singleData.name}
                      width={150}
                      height={150}
                      priority={true}
                    />
                  </div>
                  <hr />
                  <h3>ID: {singleData._id}</h3>
                  <hr />
                  <h3>Provider: {singleData.brandName}</h3>
                  <hr />
                </>
              ) : (
                <p>Loading Data...</p>
              )}
            </div>
          </Modal>

          {/* Modal for delete confirmation */}
          <Modal open={popUpDelete} onClose={toggleDelete}>
            <div className="modal_container detail_modal">
              <h2 style={{ textAlign: "center", paddingBottom: "1rem" }}>
                Are you sure you want to delete {singleData.name}?
              </h2>

              <div className="action_btn">
                <button className="delete_btn" onClick={toggleDelete}>
                  No
                </button>
                <button
                  onClick={() => handleDelete(singleData._id)}
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

