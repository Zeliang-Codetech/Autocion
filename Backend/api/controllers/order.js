import { OrderModel } from "../models/order.model.js";
import ErrorHandler from "../utils/utility-class.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { sendmail } from "../sendMail.js";
import { sendConfirmationEmail } from "../middlewares/sendMail.js";

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const checkOut = async (req, res) => {
  try {
    const {
      name,
      amount,
      user,
      price,
      userId,
      category,
      provider,
      model,
      userEmail,
    } = req.body;
    const order = await razorpay.orders.create({
      amount: Number(amount * 100),
      currency: "INR",
    });
    await OrderModel.create({
      order_id: order.id,
      name: name,
      user: user,
      userId: userId,
      userEmail: userEmail,
      amount: amount,
      price: price,
      category: category,
      provider: provider,
      model: model,
    });

    res.status(200).json({ order, currency: "INR" });
  } catch (error) {
    console.log(error);
  }
};
export const paymentVerification = async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body_data = razorpay_order_id + "|" + razorpay_payment_id;
  const expect = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body_data)
    .digest("hex");

  const isValid = expect === razorpay_signature;

  if (isValid) {
    const updateData = {
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    };

    await OrderModel.updateMany(
      {
        $or: [
          { razorpay_payment_id: { $exists: false } },
          { razorpay_payment_id: null },
        ],
      },
      { $set: updateData },
      { multi: true }
    );

    res.redirect(
      `${process.env.CLIENT_URL}/success?payment_id=${razorpay_payment_id}`
    );
    sendConfirmationEmail(req, res, next);
  } else {
    res.redirect(`${process.env.CLIENT_URL}/failed`);
  }
};

// export const paymentVerification = async (req, res) => {
//   const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//     req.body;

//   const body_data = razorpay_order_id + "|" + razorpay_payment_id;
//   const expect = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body_data)
//     .digest("hex");

//   const isValid = expect === razorpay_signature;

//   if (isValid) {

//     await OrderModel.findOneAndUpdate(
//       { order_id: razorpay_order_id }, // Filter criteria
//       { razorpay_order_id, razorpay_payment_id, razorpay_signature }, // Update document
//       { new: true } // To return the updated document
//     );

//     res.redirect(
//       `http://localhost:3000/success?payment_id=${razorpay_payment_id}`
//     );
//     return;
//   } else {
//     res.redirect("http://localhost:3000/failed");
//     return;
//   }
// };

export const getOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = await OrderModel.findById(id);

    if (orders) {
      res.status(200).json({
        status: 1,
        success: true,
        message: "Appointments fetched.",
        orders: orders,
      });
    } else {
      return next(new ErrorHandler("Cannot fetch.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find(req.body);
    if (orders) {
      res.status(200).json({
        status: 1,
        success: true,
        message: "Orders fetched",
        orders: orders,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
// export const paymentVerification = async (req, res) => {
//   const verificationRequests = req.body;

//   try {
//     if (!Array.isArray(verificationRequests)) {
//       // If req.body is not an array, handle it accordingly
//       throw new Error("Verification requests must be an array.");
//     }

//     const updatedOrders = [];

//     for (const request of verificationRequests) {
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//         request;

//       const body_data = razorpay_order_id + "|" + razorpay_payment_id;
//       const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body_data)
//         .digest("hex");

//       const isValid = expectedSignature === razorpay_signature;

//       if (isValid) {
//         // Update the document with the received payment details
//         const updatedOrder = await OrderModel.findOneAndUpdate(
//           { order_id: razorpay_order_id },
//           {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//           },
//           { new: true }
//         );

//         updatedOrders.push(updatedOrder);
//       }
//     }

//     // Check if all updates were successful
//     if (updatedOrders.length === verificationRequests.length) {
//       res.redirect(`http://localhost:3000/success`);
//     } else {
//       res.redirect("http://localhost:3000/failed");
//     }
//   } catch (error) {
//     console.error("Error updating orders:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
