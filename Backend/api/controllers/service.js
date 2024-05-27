import { Service } from "../models/service.js";
import ErrorHandler from "../utils/utility-class.js";

export const createService = async (req, res, next) => {
  try {
    const image = req.file;
    if (!image) {
      return next(new ErrorHandler("No image file uploaded", 400));
    }
    const {
      provider,
      category,
      model,
      name,
      tags,
      description,
      duration,
      members,
      tax,
      taxPercent,
      price,
      discount,
      serviceOption,
    } = req.body;
    if (!name) {
      return next(new ErrorHandler("Please add all fields.", 400));
    }
    const validate = await Service.find({
      provider: provider,
      name: name,
    }).populate("provider");
    const formattedProvider = validate.map((provider) => ({
      name: provider.provider.name,
    }));
    if (validate.length === 0) {
      const serviceData = {
        provider: provider,
        category: category,
        model: model,
        name: name,
        tags: tags,
        description: description,
        duration: duration,
        member: members,
        tax: tax,
        taxPercent: taxPercent,
        price: price,
        discount: discount,
        serviceOption: serviceOption,
        image: image.filename,
      };

      const createService = await Service.create(serviceData);

      if (createService) {
        res.status(201).json({
          status: 1,
          success: true,
          message: "Service created",
          createService,
        });
      }
    } else {
      return next(
        new ErrorHandler(
          `${name} already exist for ${formattedProvider[0].name}.`,
          400
        )
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getAllService = async (req, res, next) => {
  try {
    const getService = await Service.find(req.body)
      .populate("provider")
      .populate("category");
    if (getService) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Service fetched.",
        getService: getService.map((service) => ({
          _id: service._id,
          provider: service.provider._id,
          providerName: service.provider.name,
          category: service.category ? service.category._id : null,
          categoryName: service.category ? service.category.name : null,
          name: service.name,
          tags: service.tags,
          description: service.description,
          image: service.image,
          duration: service.duration,
          members: service.members,
          tax: service.tax,
          taxPercent: service.taxPercent,
          price: service.price,
          discount: service.discount,
          serviceOption: service.serviceOption,
          status: service.status,
        })),
      });
    } else {
      return next(new ErrorHandler("Can't fetch.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const service = await Service.findById(id)
      .populate("provider")
      .populate("category");
    if (service) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Service fetched.",
        service: {
          _id: service._id,
          provider: service.provider._id,
          providerName: service.provider.name,
          providerName: service.provider.name,
          category: service.category ? service.category._id : null,
          categoryName: service.category ? service.category.name : null,
          name: service.name,
          tags: service.tags,
          description: service.description,
          image: service.image,
          duration: service.duration,
          members: service.members,
          tax: service.tax,
          taxPercent: service.taxPercent,
          price: service.price,
          discount: service.discount,
          serviceOption: service.serviceOption,
          status: service.status,
        },
      });
    } else {
      return next(new ErrorHandler("Invalid ID", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const service = await Service.findByIdAndDelete(id);
    if (service) {
      res
        .status(201)
        .json({ status: 1, success: true, message: "Service deleted." });
    } else {
      return next(new ErrorHandler("Invalid ID", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const updateService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const image = req.file;
    let updateFields = { name: name };
    if (image) {
      updateFields.image = image.filename;
    }
    const updateService = await Service.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (updateService) {
      res
        .status(201)
        .json({ status: 1, success: true, message: "Service updated." });
    } else {
      return next(new ErrorHandler("Invalid ID", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};
