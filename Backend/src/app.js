import express from "express"
import userRoutes from "./routes/user.js";
import brandRoutes from "./routes/brand.js"
import modelRoute from "./routes/vehicle.model.js"
import serviceRoute from "./routes/service.js"
import appointmentRoute from "./routes/appointment.js"
import { connectDB } from "./utils/dbConnect.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"
import 'dotenv/config';


const PORT = 8000

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", userRoutes)
app.use("/api/v1", brandRoutes)
app.use("/api/v1", modelRoute)
app.use("/api/v1", serviceRoute)
app.use("/api/v1", appointmentRoute)
app.use('/uploads', express.static('uploads'));


app.get("/", ( res) => {
    console.log("Cors Api is Working")
    res.json("Cors Api working")
})

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`)
})