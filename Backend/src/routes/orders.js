import express from "express";

import { checkOut, paymentVerification } from "../controllers/order.js";

const router = express.Router();

router.post("/payment/checkout", checkOut);
router.post("/payment/payment/verification", paymentVerification);

export default router;
