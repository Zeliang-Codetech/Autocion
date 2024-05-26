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
