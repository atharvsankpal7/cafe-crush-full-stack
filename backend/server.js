import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import staffRouter from "./routes/staffRoute.js";
import salesRouter from "./routes/salesRoutes.js";
import stockRouter from "./routes/stockRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js"
// app config
const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/staff", staffRouter); 
app.use("/api/sales", salesRouter);
app.use("/api/stock", stockRouter);
app.use("/api/restaurant", restaurantRouter);
app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))