import express from "express";
import { registerController,loginController, protectedController } from "../controllers/authControllers.js";
import { isRegisteredUserTokenIsPresentMiddleware } from "../middlewares/authMiddleware.js";

// Router to access Authorisation related routes
const authRouter = express.Router();

// Routes

/**
 * @authRouter /api/v1/auth/register
 * @description Register user
 * @access public
 */
authRouter.post("/register",registerController);

/**
 * @authRouter /api/v1/auth/login
 * @description Login user
 * @access public
 */
authRouter.post("/login",loginController);


/**
 * @authRouter /api/v1/auth/login
 * @description Login user
 * @access protected
 */
authRouter.get("/protected-route",isRegisteredUserTokenIsPresentMiddleware,protectedController);

// Exporting Router
export default authRouter;