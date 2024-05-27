import { Brand } from "../models/brand.js";
import ErrorHandler from "../utils/utility-class.js";

export const createBrand = async (req, res, next) => {
  try {
    const { name, mobile, email, status } = req.body;
    const image = req.file;
    if (!name || !image) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    const validate = await Brand.find({ name: name });

    if (validate.length === 0) {
      const newBrand = await Brand.create({
        name: name,
        mobile: mobile,
        email: email,
        status: status,
        image: image.filename,
      });

      if (newBrand) {
        res.status(201).json({
          status: 1,
          success: true,
          message: "Brand created.",
          newBrand,
        });
      }
    } else {
      // If brand already exists, don't upload the file
      return next(new ErrorHandler("Brand already exists", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error: error });
  }
};

export const getAllBrands = async (req, res) => {
  try {
    const brands = req.body;
    const brandsData = await Brand.find(brands);
    res.status(201).json({
      status: 1,
      success: true,
      message: "Brand details fetched.",
      brandsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error: error });
  }
};

export const getBrandsById = async (req, res) => {
  try {
    const id = req.params.id;
    const brandData = await Brand.findById(id);

    if (brandData) {
      const { brandVehicles } = req; // Fetched vehicles are available in req.brandVehicles
      const formattedBrandVehicles =
        brandVehicles && Array.isArray(brandVehicles)
          ? brandVehicles.map((data) => ({
              ...data._doc,
              model: data.model ? data.model.name : "N/A",
            }))
          : [];

      res.status(201).json({
        status: 1,
        success: true,
        message: "Brand found",
        response: brandData,
        model: formattedBrandVehicles,
      });
    } else {
      return next(new ErrorHandler("Brand not found.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error: error });
  }
};

export const deleteBrandById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteBrand = await Brand.findByIdAndDelete(id);
    if (deleteBrand) {
      return res
        .status(201)
        .json({ status: 1, success: true, message: "Brand deleted" });
    } else {
      return next(new ErrorHandler("Delete failed.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error: error });
  }
};

export const updateBrandById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, mobile, email, status } = req.body;
    const image = req.file;

    let updateFields = {
      name: name,
      mobile: mobile,
      email: email,
      status: status,
    };
    if (image) {
      updateFields.image = image.filename;
    }
    const updateBrand = await Brand.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (updateBrand) {
      return res.status(201).json({
        status: 1,
        success: true,
        message: "Brand updated",
        updateBrand,
      });
    } else {
      return next(new ErrorHandler("Update failed.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error: error });
  }
};
