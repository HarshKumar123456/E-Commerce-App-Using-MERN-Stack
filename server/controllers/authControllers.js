import User from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";

const registerController = async (req,res) => {
    // console.log("Inside Register controller function....");

    
    try {
        // Extracting information from req.body
        const {name,email,password,phone,address} = req.body;

        // Checking if all things are given 
        if(!name){
            return res.send({error: "Name is required...."});
        }
        if(!email){
            return res.send({error: "Email is required...."});
        }
        if(!password){
            return res.send({error: "Password is required...."});
        }
        if(!phone){
            return res.send({error: "Phone is required...."});
        }
        if(!address){
            return res.send({error: "Address is required...."});
        }

        // Checking if user is already registered
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(200).json(
                {
                    success: true,
                    message: "User is already registered....",
                }
            )
        }

        // Register New User
        
        // Hashing password
        const hashedPassword = await hashPassword(password);

        // Saving User Details in MongoDB Databasse
        const user = await new User({name,email,password: hashedPassword,phone,address}).save();

        return res.status(201).json(
            {
                success: true,
                message: "User registered successfully....",
                user
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Error registering user....",
                error
            }
        )
    }
};

export {registerController};