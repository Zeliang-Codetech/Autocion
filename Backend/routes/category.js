import express from "express";
import { upload } from "../middlewares/Multer.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/category.js";
import { fetchServiceByCategory } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create/category", upload, createCategory);
router.get("/get/category", getAllCategory);
router.get("/get/category/:id", fetchServiceByCategory, getCategoryById);
router.delete("/delete/category/:id", deleteCategory);
router.put("/update/category/:id", upload, updateCategory);

export default router;
