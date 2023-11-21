import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

// Connecting to MongoDB 
connectDB();

const PORT = process.env.PORT || 8000;

app.get("/" , (req,res) => {
    res.status(200).json({message: "Welcome To The SERVER...."})
});

app.listen(PORT,()=>{
    console.log(`Server is up and running on the port ${PORT}`);
});