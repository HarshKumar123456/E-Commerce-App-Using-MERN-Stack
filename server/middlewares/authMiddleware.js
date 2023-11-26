import "dotenv/config";
import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

const isRegisteredUserTokenIsPresentMiddleware = async (req,res,next) => {
    // console.log("Inside middleware....");
    // console.log(req.headers);
    // console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization;
        const secret = process.env.JSON_WEB_TOKEN_SECRET;
        const decodeToken = await JWT.verify(token,secret);
        if (!decodeToken) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Json Web Token is not defined...."
                }
            );
        }
        req.user = decodeToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: "Some error occured....",
                error
            }
        );
    }
};


const checkIfAdminMiddleware = async (req,res,next) => {
    try {
        // Get user from database
        const user = await User.findOne({_id: req.user._id});

        if (user.role !== 1) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Unauthorised access to Admin page....",
                    user: {
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        address: user.address
                    }
                }
            );
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Some error occured....",
                error
            }
        );
    }
};

export {isRegisteredUserTokenIsPresentMiddleware,checkIfAdminMiddleware};