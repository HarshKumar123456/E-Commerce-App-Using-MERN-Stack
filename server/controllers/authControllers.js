import "dotenv/config.js";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
    // console.log("Inside Register controller function....");


    try {
        // Extracting information from req.body
        const { name, email, password, phone, address } = req.body;

        // Checking if all things are given 
        if (!name) {
            return res.send({ error: "Name is required...." });
        }
        if (!email) {
            return res.send({ error: "Email is required...." });
        }
        if (!password) {
            return res.send({ error: "Password is required...." });
        }
        if (!phone) {
            return res.send({ error: "Phone is required...." });
        }
        if (!address) {
            return res.send({ error: "Address is required...." });
        }

        // Checking if user is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
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
        const user = await new User({ name, email, password: hashedPassword, phone, address }).save();

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

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Invalid email or password....",
                    error,
                }
            );
        }

        // Finding User having the given email
        const user = await User.findOne({ email });

        // If user is not found with the given email then return
        if (!user) {
            return res.status(200).json(
                {
                    success: false,
                    message: "Email is not registered....",
                }
            );
        }

        // Checking if password is correct or not for user found with given email 
        const isRightPassword = await comparePassword(password, user.password);
        if (!isRightPassword) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Invalid password....",
                }
            );
        }

        // Creating Json Web Token for authorised User
        const token = await JWT.sign({_id: user._id},process.env.JSON_WEB_TOKEN_SECRET,{expiresIn: "7d"});

        // Passing Token to the client
        return res.status(200).json(
            {
                success: true,
                message: "Logged in Successfully....",
                user: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    address: user.address,
                },
                token,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Some Error occured....",
                error,
            }
        );
    }
};

export { registerController,loginController };