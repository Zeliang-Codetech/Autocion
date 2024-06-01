"use client";
import axios from "axios";
import "../providers/providers.scss";
import "./categories.scss";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import Image from "next/image";
import Modal from "../../../components/modal/Modal";
import PrivateRoute from "../../../Routes/AdminRoute";

const page = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const [popUpDelete, setPopUpDelete] = useState(false);
  const [popUpDetails, setPopUpDetails] = useState(false);
  const [popUpEdit, setPopUpEdit] = useState(false);

  const [preview, setPreview] = useState(null);

  const [singleData, setSingleData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [id, setId] = useState("");

  const fileInputRef = useRef();

  const toggleDelete = (id) => {
    setPopUpDelete(!popUpDelete);
    setId(id);
  };
  const toggleDetails = (id) => {
    setPopUpDetails(!popUpDetails);
    setId(id);
  };
  const toggleEdit = async (id) => {
    setPopUpEdit(!popUpEdit);
    setId(id);
    await fetchSingleCategory(id);
  };

  const handleFileEditChange = (e) => {
    const [file] = e.target.files;
    setSingleData((prev) => ({ ...prev, image: file }));
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const fetchSingleCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.API_KEY}/api/v1/get/category/${id}`
      );
      setSingleData(res.data.category);
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
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formdata = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formdata.append(key, value);
      });

      const submit = await axios.post(
        `${process.env.API_KEY}/api/v1/create/category`,
        formdata
      );
      if (submit.data.status === 1) {
        toast.success("Provider details added successfully.");
      }
      fetchCategory();
      setData({
        name: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(
        `${process.env.API_KEY}/api/v1/delete/category/${_id}`
      );

      if (res.data.status === 1) {
        toast.success(`Provider has been deleted.`);
      }
      fetchCategory();
      toggleDelete();
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

      if (singleData.status !== "") {
        formData.append("status", singleData.status);
      }

      const response = await axios.put(
        `${process.env.API_KEY}/api/v1/update/category/${singleData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === 1) {
        toast.success("Provider details updated successfully.");
        fetchCategory();
        toggleEdit();
      } else {
        toast.error("Provider details update failed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditChange = (e) => {
    setSingleData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchSingleCategory();
  }, [id]);

  return (
    <>
      <PrivateRoute>
        <h3 className="categories_heading">Categories</h3>
        <div className="categories_container">
          <div className="category_form ">
            <div className="category_heading">
              <h3>Category</h3>
            </div>
            <hr />
            <form action="Post">
              <input
                onChange={handleChange}
                name="name"
                value={data.name}
                type="text"
                placeholder="Name of the category"
              />
              <input onChange={handleFileChange} name="image" type="file" />
              <button onClick={handleSubmit}>Add</button>
            </form>
          </div>
          <div className="providers_container">
            <div className="providers_heading">
              <h3>Categories</h3>
              <input type="search" placeholder="Search" />
            </div>
            <hr />
            <div className="providers_heading"></div>
            <table className="table">
              <thead>
                <tr className="table_head">
                  <th>S.No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((data, index) => (
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
                    </td>
                    <td onClick={() => toggleDetails(data._id)}>
                      {" "}
                      {data.name}
                    </td>
                    <td onClick={() => toggleDetails(data._id)}>
                      <div
                        className={`status ${
                          data.status === "Disabled" ? "red_bg" : "green_bg"
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
          </div>
          <Toaster
            toastOptions={{ className: "toast" }}
            position="top-center"
            richColors="true"
          />
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
          {/*Modal for category details */}
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
                />
              </div>
              <hr />
              <h3>ID: {singleData && singleData._id}</h3>
              <hr />
              <div className="status">
                <p
                  className={` ${
                    singleData && singleData.status === "Disabled"
                      ? "red_bg"
                      : "green_bg"
                  }`}
                >
                  Status: {singleData && singleData.status}
                </p>
              </div>
              <hr />
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
                  />
                ) : (
                  <>
                    <Image
                      className="logo_providers"
                      src={preview}
                      alt={singleData && singleData.image}
                      width={150}
                      height={150}
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
                <div className="action_btn">
                  <input
                    type="radio"
                    name="status"
                    value="Enabled"
                    onChange={handleEditChange}
                    checked={singleData && singleData.status === "Enabled"}
                  />
                  <label htmlFor="enable">Enable </label>

                  <input
                    type="radio"
                    name="status"
                    value="Disabled"
                    onChange={handleEditChange}
                    checked={singleData && singleData.status === "Disabled"}
                  />
                  <label htmlFor="disable">Disable</label>
                </div>
                <div className="form_btn">
                  <button onClick={(e) => handleUpdate(e)}>Update</button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </PrivateRoute>
    </>
  );
};

export default page;
