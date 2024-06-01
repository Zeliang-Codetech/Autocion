import express from "express"

import { createAppointment, deleteAppointment, getAllAppointment, getAppointmentById, updateAppointmentStatus } from "../controllers/appointment.js"

const router = express.Router()

router.post("/create/appointment", createAppointment)
router.get("/get/appointment", getAllAppointment)
router.get("/get/appointment/:id", getAppointmentById)

router.delete("/delete/appointment/:id", deleteAppointment)
router.put("/update/appointment/:id", updateAppointmentStatus)


export default router
