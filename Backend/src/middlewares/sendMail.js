import { OrderModel } from "../models/order.model.js";
import { sendmail } from "../sendMail.js";

export const sendConfirmationEmail = async (req, res) => {
  try {
    const { userEmail, razorpay_payment_id } = req.body;
    const order = await OrderModel.findOne({
      razorpay_payment_id: razorpay_payment_id,
    });

    if (order === null) {
      console.log("Order not found");
    }

    const subject = "Payment Confirmation";
    const text = "Your payment has been successfully verified.";
    await sendmail(order.userEmail, subject, text); // Send email to the user's email address
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
