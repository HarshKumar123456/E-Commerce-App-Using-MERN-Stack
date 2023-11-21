import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/" , (req,res) => {
    res.status(200).json({message: "Welcome To The SERVER...."})
});

app.listen(PORT,()=>{
    console.log(`Server is up and running on the port ${PORT}`);
});