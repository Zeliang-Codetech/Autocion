import express from "express";

import {
  checkOut,
  getOrders,
  paymentVerification,
} from "../controllers/order.js";
// import { sendConfirmationEmail } from "../middlewares/sendMail.js";

const router = express.Router();

router.post("/payment/checkout", checkOut);
router.post("/payment/payment/verification", paymentVerification);
router.get("/get/orders", getOrders);

export default router;
