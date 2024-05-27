import express from "express";
import userRoutes from "./routes/user.js";
import brandRoutes from "./routes/brand.js";
import modelRoute from "./routes/vehicle.model.js";
import serviceRoute from "./routes/service.js";
import appointmentRoute from "./routes/appointment.js";
import categoryRoute from "./routes/category.js";
import order from "./routes/orders.js";
import cart from "./routes/cart.js";
import { connectDB } from "./utils/dbConnect.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

const PORT = 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// not working for some reason 
// app.use(cors());

// hardcoded 
app.use(
  cors({
    origin: ["http://localhost:3000", "https://autocion-s436.vercel.app/"],
    methods: [ "POST",  "GET" ],
    credentials: true,
  })
);


app.use("/api/v1", userRoutes);
app.use("/api/v1", brandRoutes);
app.use("/api/v1", modelRoute);
app.use("/api/v1", serviceRoute);
app.use("/api/v1", appointmentRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", order);
app.use("/api/v1", cart);
app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server connected at port ${PORT}`);
});
