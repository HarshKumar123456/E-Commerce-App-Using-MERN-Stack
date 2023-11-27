import express from "express";
import { registerController, loginController, protectedController, forgotPasswordController } from "../controllers/authControllers.js";
import { checkIfAdminMiddleware, isRegisteredUserTokenIsPresentMiddleware } from "../middlewares/authMiddleware.js";

// Router to access Authorisation related routes
const authRouter = express.Router();

// Routes

/**
 * @authRouter /api/v1/auth/register
 * @description Register user
 * @access public
 */
authRouter.post("/register", registerController);

/**
 * @authRouter /api/v1/auth/login
 * @description Login user
 * @access public
 */
authRouter.post("/login", loginController);

/**
 * @authRouter /api/v1/auth/forgot-password
 * @description Let the registered user change their password
 * @access public
 */
authRouter.post("/forgot-password", forgotPasswordController);


/**
 * @authRouter /api/v1/auth/protected-route
 * @description Admin user login
 * @access protected
 */
authRouter.get("/protected-route", isRegisteredUserTokenIsPresentMiddleware, checkIfAdminMiddleware, protectedController);

/**
 * @authRouter /api/v1/auth/is-signed-in
 * @description Checking If user is Authorised or not
 * @access protected
 */
authRouter.get("/is-signed-in", isRegisteredUserTokenIsPresentMiddleware, (req, res) => {
    res.status(200).json({ isSignedIn: true, message: "User is authorised...." });
});

// Exporting Router
export default authRouter;