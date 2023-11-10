import express  from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbConfig.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = 3000;

connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})
