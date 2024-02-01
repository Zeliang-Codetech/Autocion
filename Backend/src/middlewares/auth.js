import { Appointment } from "../models/appointments.js";
import { Brand } from "../models/brand.js";
import { User } from "../models/user.js";
import { Model } from "../models/vehicle.model.js";

export const fetchVehiclesByBrand = async (req, res, next) => {
    try {
        const id = req.params.id
        const brand = await Brand.findById(id);

        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        const vehicles = await Model.find({ brand: brand._id });

        // Attach the fetched vehicles to the request object for later use
        req.brandVehicles = vehicles;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error)
    }
}

export const fetchAppointmentByUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const appointments = await Appointment.find({ user: user._id })
            .populate('brand')
            .populate('model')
            .populate('service');

        // Attach the fetched appointments to the request object for later use
        req.userAppointments = appointments;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error)
    }

}