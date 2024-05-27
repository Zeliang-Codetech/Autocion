import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserbyId,
  loginUser,
  updatePassword,
  updateUser,
} from "../controllers/user.js";
import {
  authentication,
  fetchOrderByUser,
  getCartItemsByUser,
} from "../middlewares/auth.js";
import { upload } from "../middlewares/Multer.js";

const router = express.Router();

router.post("/create/user", createUser);
router.post("/login/user", loginUser);

router.get("/get/user", getAllUser);
router.get(
  "/get/user/:id",
  authentication,
  getCartItemsByUser,
  fetchOrderByUser,
  getUserbyId
);
router.get("/get/single/user", authentication, getSingleUser);

router.delete("/delete/user/:id", deleteUser);
router.put("/update/user/:id", upload, updateUser);
router.put("/user/updatePassword/:id", updatePassword);

export default router;
