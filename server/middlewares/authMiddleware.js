import "dotenv/config";
import JWT from "jsonwebtoken";

const isRegisteredUserTokenIsPresentMiddleware = async (req,res,next) => {
    // console.log("Inside middleware....");
    // console.log(req.headers);
    // console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization;
        const secret = process.env.JSON_WEB_TOKEN_SECRET;
        const decodeToken = await JWT.verify(token,secret);
        next();
    } catch (error) {
        console.log(error);
    }
};

export {isRegisteredUserTokenIsPresentMiddleware};