import { Category } from "../models/category.js";
import ErrorHandler from "../utils/utility-class.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    const image = req.file;
    if (!name) {
      return next(new ErrorHandler("Add all fields.", 400));
    }
    const validate = await Category.find({ name: name });
    if (validate.length === 0) {
      const createCategory = await Category.create({
        name: name,
        status: status,
        image: image.filename,
      });
      if (createCategory) {
        res.status(201).json({
          status: 1,
          success: true,
          message: "Category created",
          createCategory,
        });
      }
    } else {
      return next(new ErrorHandler("Category already exist.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const getCategory = await Category.find({ ...req.body });
    if (getCategory) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Category fetched.",
        getCategory,
      });
    } else {
      return next(new ErrorHandler("Can't fetch.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    const { categoryService } = req;
    if (category) {
      const formattedService = categoryService.map((data) => ({
        name: data ? data.name : "N/A",
        image: data ? data.image : "N/A",
      }));
      res.status(201).json({
        status: 1,
        success: true,
        message: "Single category fetched.",
        category,
        services: formattedService,
      });
    } else {
      return next(new ErrorHandler("Invalid ID", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (category) {
      res
        .status(201)
        .json({ status: 1, success: true, message: "Category deleted." });
    } else {
      return next(new ErrorHandler("Invalid ID", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, status } = req.body;
    const image = req.file;
    let updateFields = { name: name, status: status };
    if (image) {
      updateFields.image = image.filename;
    }
    const updateCategory = await Category.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (updateCategory) {
      res
        .status(201)
        .json({ status: 1, success: true, message: "Category updated." });
    } else {
      return next(new ErrorHandler("Invalid ID", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};
