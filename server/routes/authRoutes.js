import express from "express";

// Router to access Authorisation related routes
const authRouter = express.Router();

// Routes

/**
 * @authRouter /auth/register
 * @description Register user
 * @access public
 */
authRouter.get("/register");


// Exporting Router
export default authRouter;