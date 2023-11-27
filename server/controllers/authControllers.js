import "dotenv/config.js";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
    // console.log("Inside Register controller function....");


    try {
        // Extracting information from req.body
        const { name, email, password,securityQuestionKaAnswer, phone, address } = req.body;

        // Checking if all things are given 
        if (!name) {
            return res.send({ message: "Name is required...." });
        }
        if (!email) {
            return res.send({ message: "Email is required...." });
        }
        if (!password) {
            return res.send({ message: "Password is required...." });
        }
        if (!securityQuestionKaAnswer) {
            return res.send({ message: "Security Question's answer is required...." });
        }
        if (!phone) {
            return res.send({ message: "Phone is required...." });
        }
        if (!address) {
            return res.send({ message: "Address is required...." });
        }

        // Checking if user is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {

            // Creating Json Web Token for authorised User
            const token = await JWT.sign({ _id: existingUser._id }, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: "7d" });

            return res.status(200).json(
                {
                    success: true,
                    message: "User is already registered....",
                    user: {
                        name: existingUser.name,
                        phone: existingUser.phone,
                        email: existingUser.email,
                        address: existingUser.address,
                    },
                    token,
                }
            )
        }

        // Register New User

        // Hashing password
        const hashedPassword = await hashPassword(password);

        // Saving User Details in MongoDB Databasse
        const user = await new User({ name, email, password: hashedPassword,securityQuestionKaAnswer, phone, address }).save();

        // Creating Json Web Token for authorised User
        const token = await JWT.sign({ _id: user._id }, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: "7d" });

        return res.status(201).json(
            {
                success: true,
                message: "User registered successfully....",
                user: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    address: user.address,
                },
                token,
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
        const token = await JWT.sign({ _id: user._id }, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: "7d" });

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

const forgotPasswordController = async (req, res) => {
    // Getting Details of user from req.body
    const { email, newPassword, securityQuestionKaAnswer } = req.body;

    // Checking if the user with email exists or not
    const existingUser = await User.findOne({ email, securityQuestionKaAnswer });

    if (existingUser) {
        // If user exists then change password
        const hashedPassword = await hashPassword(newPassword);
        try {
            const userAfterUpdatedPassword = await User.findOneAndUpdate({ email }, { password: hashedPassword });

            res.status(200).json({
                success: true,
                message: "Password Changed Successfully....",
            })
        } catch (error) {
            // In case any errors while updating
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Something went wrong....",
                error
            })
        }
    }
    else {
        // If user doesn't exist then return 
        res.status(200).json({
            success: false,
            message: "Either the Email or Security Question's answer is Wrong...."
        })
    }
};

const protectedController = async (req, res) => {
    res.status(200).json({ message: "protected route accessed successfully...." });
};

export { registerController, loginController, protectedController, forgotPasswordController };