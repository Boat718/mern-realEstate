import express  from "express";
import mongoose from "mongoose";
import connectDB from "./config/dbConfig.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;

connectDB();

app.get("/", (req, res) => res.send("Hello World!"));


mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})