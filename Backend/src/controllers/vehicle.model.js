import { Model } from "../models/vehicle.model.js";
import ErrorHandler from "../utils/utility-class.js";

export const createModel = async (req, res) => {
    try {
        const { name, brand } = req.body;
        const image = req.file
        const vehicleModel = await Model.create({
            name: name,
            brand: brand,
            image: {
                data: image.buffer,
                contentType: image.originalname,
            }
        });
        if (vehicleModel) {
            res.status(201).json({ status: 1, success: true, message: "Vehicle model added.", vehicleModel, });
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

        const vehicleModel = await Model.find({ ...req.body });
        if (vehicleModel != 0) {
            res.status(201).json({ status: 1, success: true, message: "Vehicle model found", vehicleModel, });
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
        const vehicleModel = await Model.findById(id);
        if (vehicleModel) {
            res.status(201).json({ status: 1, success: true, message: "Vehicle model found", vehicleModel, });
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
            res.status(201).json({ status: 1, success: true, message: "Model deleted." });
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
        const model = req.body;
        const image = req.file
        const vehicleModel = await Model.findById(id);

        if (!vehicleModel) {
            return next(new ErrorHandler("Invalid Id", 400));
        }
        let updateFields = { model: model }
        if (image) {
            updateFields.image = {
                data: image.buffer,
                contentType: image.originalname,
            };
        }
        const updateVehicle = await Model.findByIdAndUpdate(id, updateFields, { new: true });
        if (updateVehicle) {
            res.status(201).json({ status: 1, success: true, message: "Model updated." });
        } else {
            return next(new ErrorHandler("Model update failed", 400));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: "Error", error });
    }
};
