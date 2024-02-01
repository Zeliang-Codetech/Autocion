import express from "express"
import { createUser, deleteUser, getAllUser, getUserbyId, loginUser, updateUser } from "../controllers/user.js"
import { fetchAppointmentByUser } from "../middlewares/auth.js"
import { upload } from "../middlewares/Multer.js"

const router = express.Router()

router.post("/create/user", upload, createUser)
router.post("/login/user/", loginUser)

router.get("/get/user", getAllUser)
router.get("/get/user/:id", fetchAppointmentByUser, getUserbyId)


router.delete("/delete/user/:id", deleteUser)
router.put("/update/user/:id", upload, updateUser)



export default router