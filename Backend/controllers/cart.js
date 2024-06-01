import { Cart } from "../models/cart.js";
import { User } from "../models/user.js";

export const addToCart = async (req, res, next) => {
  try {
    const body = req.body;

    const cart = await Cart.create(body);
    if (cart) {
      res.status(200).json({
        status: 1,
        success: true,
        message: "Item added to cart.",
        cart,
      });
    } else {
      res.status(500).json({ status: 0, message: "Failed" });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await Cart.findById(id);

    if (cartItem) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Cart Item fetched.",

        cartItem,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCartItem = await Cart.findByIdAndDelete(id);
    if (deleteCartItem) {
      res.status(201).json({
        status: 1,
        success: true,
        message: "Item removed from Cart.",
      });
    } else {
      res.status(400).json({
        status: 0,
        success: false,
        message: "Item delete failed.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
