import { Service } from "../models/service.js";
import ErrorHandler from "../utils/utility-class.js";

export const createService = async (req, res, next) => {
    try {
        const { name } = req.body
        const image = req.file
        if (!name) {
            return next(new ErrorHandler("Add all fields.", 400))
        }
        const validate = await Service.find({ name: name })
        if (validate.length === 0) {
            const createService = await Service.create({
                name: name,
                image: image.filename
            })
            if (createService) {
                res.status(201).json({
                    status: 1, success: true, message: "Service created", createService
                })
            }


        } else {
            return next(new ErrorHandler("Service already exist.", 400))
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 0, message: "Error", error });
    }
}



export const getAllService = async (req, res, next) => {
    try {
        const getService = await Service.find({ ...req.body })
        if (getService) {
            res.status(201).json({ status: 1, success: true, message: "Service fetched.", getService })
        } else {
            return next(new ErrorHandler("Can't fetch.", 400))
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 0, message: "Error", error });
    }
}

export const getServiceById = async (req, res, next) => {
    try {
        const id = req.params.id
        const service = await Service.findById(id)
        if (service) {
            res.status(201).json({ status: 1, success: true, message: "Service fetched.", service })
        } else {
            return next(new ErrorHandler("Invalid ID", 400))
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 0, message: "Error", error });
    }
}

export const deleteService = async (req, res, next) => {
    try {
        const id = req.params.id
        const service = await Service.findByIdAndDelete(id)
        if (service) {
            res.status(201).json({ status: 1, success: true, message: "Service deleted." })
        } else {
            return next(new ErrorHandler("Invalid ID", 400))
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 0, message: "Error", error });
    }
}

export const updateService = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name } = req.body
        const image = req.file
        let updateFields = { name: name }
        if (image) {
            updateFields.image = image.filename
        }
        const updateService = await Service.findByIdAndUpdate(id, updateFields, { new: true })
        if (updateService) {
            res.status(201).json({ status: 1, success: true, message: "Service updated." })
        } else {
            return next(new ErrorHandler("Invalid ID", 400))
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 0, message: "Error", error });
    }
}