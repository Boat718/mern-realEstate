import express  from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbConfig.js";
import dotenv from "dotenv";
import signup from "./routes/auth.route.js";

dotenv.config();
const app = express();
const port = 3000;

connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/auth", signup);

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
