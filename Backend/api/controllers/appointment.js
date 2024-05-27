import { Appointment } from "../models/appointments.js";
import ErrorHandler from "../utils/utility-class.js";

export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    if (appointment) {
      res.status(200).json({
        status: 1,
        success: true,
        message: "Appointment created",
        appointment,
      });
    } else {
      return next(new ErrorHandler("Cannot create appointment", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getAllAppointment = async (req, res, next) => {
  try {
    const appointments = await Appointment.find(req.body)
      .populate("user")
      .populate("service")
      .populate("brand")
      .populate("model");

    if (appointments) {
      const formattedAppointment = appointments.map((appointment) => ({
        _id: appointment?._id,
        user: appointment?.user?.fullname,
        service: appointment?.service?.name,
        brand: appointment?.brand?.name,
        model: appointment?.model?.name,
        appointmentDate: appointment?.appointmentDate,
        status: appointment?.status,
        __v: appointment?.__v,
      }));
      res.status(200).json({
        status: 1,
        success: true,
        message: "Appointment details fetched",
        appointment: formattedAppointment,
      });
    } else {
      return next(new ErrorHandler("Cannot fetch.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const appointments = await Appointment.findById(id)
      .populate("user")
      .populate("service")
      .populate("brand")
      .populate("model");
    if (appointments) {
      const formattedAppointment = {
        _id: appointments?._id,
        user: appointments?.user?.fullname,
        service: appointments?.service?.name,
        brand: appointments?.brand?.name,
        model: appointments?.model?.name,
        appointmentDate: appointments?.appointmentDate,
        status: appointments?.status,
        __v: appointments?.__v,
      };

      res.status(200).json({
        status: 1,
        success: true,
        message: "Appointments fetched.",
        appointment: formattedAppointment,
      });
    } else {
      return next(new ErrorHandler("Cannot fetch.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validate = await Appointment.findById(id);
    if (!validate) {
      return next(new ErrorHandler("Appointment not found.", 400));
    }
    const deleteAppointment = await Appointment.findByIdAndDelete(id);
    if (deleteAppointment) {
      res
        .status(200)
        .json({ status: 1, success: true, message: "Appointment deleted." });
    } else {
      return next(new ErrorHandler("Delete appointment failed.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!["Scheduled", "In Progress", "Completed"].includes(status)) {
      return next(new ErrorHandler("Invalid status", 400));
    }
    const validate = await Appointment.findById(id);
    if (!validate) {
      return next(new ErrorHandler("Appointment not found.", 400));
    }
    const updateAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updateAppointment) {
      return next(new ErrorHandler("Appointment not found", 404));
    }
    res
      .status(200)
      .json({ status: 1, success: true, message: "Appointment updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
