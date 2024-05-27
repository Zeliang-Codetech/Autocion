import { OrderModel } from "../models/order.model.js";
import { sendmail } from "../sendMail.js";

export const sendConfirmationEmail = async (req, res) => {
  try {
    const { razorpay_payment_id } = req.body;
    const order = await OrderModel.findOne({
      razorpay_payment_id: razorpay_payment_id,
    });

    if (order === null) {
      console.log("Order not found");
    }

    const subject = "Payment Confirmation";

    const html = generateInvoiceHTML(order);
    await sendmail(order.userEmail, subject, html); // Send email to the user's email address
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const generateInvoiceHTML = (order) => {
  const invoiceHTML = `
    <html>
    <head>
      <style>
       .container{
        border: 1px solid black;
        padding:1rem;
       }
      </style>
    </head>
    <body>
    <div class="container">
   
    <p>Hi, ${order.user}</P>
    <h2>Invoice for your order from Autocion.</h2>
      <p>Service: ${order.name}</p>
      <hr>
      <p>Email: ${order.userEmail}</p>
      <hr>
      <p>Category: ${order.category}</p>
      <hr>
      <p>Provider: ${order.provider}</p>
      <hr>
      <p>Order ID: ${order.razorpay_order_id}</p>
      <hr>
      <p>Payment ID: ${order.razorpay_payment_id}</p>
      <hr>
      <p>Amount: &#8377;  ${order.amount}</p>
      <hr>
      <h2>Thank you for choosing Autocion.</h2>
      <p>Best regards <br> Autocion.com</p>
      <div>
      </body>
    </html>
  `;
  return invoiceHTML;
};
