import express from "express";
import {
  createService,
  deleteService,
  getAllService,
  getServiceById,
  updateService,
} from "../controllers/service.js";
import { upload } from "../middlewares/Multer.js";

const router = express.Router();

router.post("/create/service", upload, createService);
router.get("/get/service", getAllService);
router.get("/get/service/:id", getServiceById);
router.delete("/delete/service/:id", deleteService);
router.put("/update/service/:id", upload, updateService);

export default router;
