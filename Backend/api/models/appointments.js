import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service", required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: true
    },
    appointmentDate:
    {
        type: Date,
        required: true
    },
    status:
    {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed'],
        default: 'Scheduled'
    },
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
