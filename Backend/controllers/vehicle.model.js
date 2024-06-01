import { Model } from "../models/vehicle.model.js";
import ErrorHandler from "../utils/utility-class.js";

export const createModel = async (req, res) => {
  try {
    const { name, brand } = req.body;
    const image = req.file;
    const vehicleModel = await Model.create({
      name: name,
      brand: brand,
      image: image.filename,
    });
    if (vehicleModel) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Vehicle model added.",
        vehicleModel,
      });
    } else {
      res.status(401).json({ status: 0, success: false, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getAllModels = async (req, res, next) => {
  try {
    const vehicleModel = await Model.find({ ...req.body }).populate("brand");
    if (vehicleModel != 0) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Vehicle model found",
        vehicleModels: vehicleModel.map((model) => ({
          _id: model._id,
          name: model.name,
          brand: model.brand._id,
          brandName: model.brand.name,
          image: model.image,
        })),
      });
    } else {
      return next(new ErrorHandler("Models not found.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getModelsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(new ErrorHandler("Invalid Id", 400));
    }

    const vehicleModel = await Model.findById(id).populate("brand");

    const { modelService } = req;

    if (vehicleModel) {
      const formattedService = modelService.map((data) => ({
        provider: data ? data.provider._id : "N/A",
        providerName: data ? data.provider.name : "N/A",
        category: data ? data.category._id : "N/A",
        categoryName: data ? data.category.name : "N/A",
        model: data ? data.model : "N/A",
        modelName: data ? data.model.name : "N/A",
        name: data ? data.name : "N/A",
        description: data ? data.description : "N/A",
        image: data ? data.image : "N/A",
        duration: data ? data.duration : "N/A",
        price: data ? data.price : "N/A",
        discount: data ? data.discount : "N/A",
      }));

      res.status(201).json({
        status: 1,
        success: true,
        message: "Vehicle model found",
        vehicleModel: {
          services: formattedService,
          _id: vehicleModel._id,
          name: vehicleModel.name,
          brand: vehicleModel.brand._id,
          brandName: vehicleModel.brand.name,
          image: vehicleModel.image,
        },
      });
    } else {
      return next(new ErrorHandler("Invalid Id", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const deleteVehicleModel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const vehicleModel = await Model.findById(id);

    if (!vehicleModel) {
      return next(new ErrorHandler("Invalid Id", 400));
    }

    const deleteVehicle = await Model.findByIdAndDelete(id);

    if (deleteVehicle) {
      res
        .status(201)
        .json({ status: 1, success: true, message: "Model deleted." });
    } else {
      return next(new ErrorHandler("Invalid Id", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const updateVehicleModel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, brand } = req.body;
    const image = req.file;
    const vehicleModel = await Model.findById(id);

    if (!vehicleModel) {
      return next(new ErrorHandler("Invalid Id", 400));
    }
    let updateFields = {
      name: name,
      brand: brand,
    };
    if (image) {
      updateFields.image = image.filename;
    }

    const updateVehicle = await Model.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (updateVehicle) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Model updated.",
        updateVehicle,
      });
    } else {
      return next(new ErrorHandler("Model update failed", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};
