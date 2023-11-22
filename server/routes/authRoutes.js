import express from "express";
import { registerController } from "../controllers/authControllers.js";

// Router to access Authorisation related routes
const authRouter = express.Router();

// Routes

/**
 * @authRouter /api/v1/auth/register
 * @description Register user
 * @access public
 */
authRouter.post("/register",registerController);


// Exporting Router
export default authRouter;