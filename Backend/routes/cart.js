import express from "express";
import { addToCart, deleteCartItem, getCartItem } from "../controllers/cart.js";

const router = express.Router();

router.post("/add/to/cart", addToCart);
router.get("/get/cart/:id", getCartItem);
router.delete("/delete/cart/item/:id", deleteCartItem);

export default router;
