import express from "express";
import {
  createModel,
  getAllModels,
  getModelsById,
  deleteVehicleModel,
  updateVehicleModel,
} from "../controllers/vehicle.model.js";
import { upload } from "../middlewares/Multer.js";
import { fetchServiceByModel } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create/model", upload, createModel);

router.get("/get/model", getAllModels);
router.get("/get/model/:id", fetchServiceByModel, getModelsById);

router.delete("/delete/model/:id", deleteVehicleModel);
router.put("/update/model/:id", upload, updateVehicleModel);

export default router;
