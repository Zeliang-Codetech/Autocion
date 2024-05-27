import { Appointment } from "../models/appointments.js";
import { Brand } from "../models/brand.js";
import { User } from "../models/user.js";
import { Model } from "../models/vehicle.model.js";
import { Service } from "../models/service.js";
import { Category } from "../models/category.js";
import jwt from "jsonwebtoken";
import { OrderModel } from "../models/order.model.js";
import { Cart } from "../models/cart.js";

export const fetchVehiclesByBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    const vehicles = await Model.find({ brand: brand._id });
    // Attach the fetched vehicles to the request object for later use
    req.brandVehicles = vehicles;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
  }
};

export const fetchServiceByModel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const model = await Model.findById(id);
    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }
    const service = await Service.find({ model: model._id })
      .populate("provider")
      .populate("category");

    req.modelService = service;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
  }
};

export const fetchServiceByCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }
    const service = await Service.find({ category: category._id });

    req.categoryService = service;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrderByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const orders = await OrderModel.find({ userId: user._id });

    // Attach the fetched appointments to the request object for later use
    req.userOrders = orders;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
  }
};

export const getCartItemsByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const cart = await Cart.find({ user: user._id });
    req.userCart = cart; // Set the userCart in the request object

    next(); // Call next to pass the control to the next middleware
  } catch (error) {
    console.log(error);
  }
};

export const authentication = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let decode = jwt.verify(req.headers.authorization, process.env.SECRET);
      if (decode) {
        req.user = await User.findById(decode._id);
        return next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
