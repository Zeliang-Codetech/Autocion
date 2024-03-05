import express from "express";
import razorpay from "../razorpay.js";

const router = express.Router();

router.post("/razorpay", razorpay);

export default router;
