import express from "express";
import { isRegisteredUserTokenIsPresentMiddleware } from "../middlewares/authMiddleware.js";
import { createOrderController } from "../controllers/paymentControllers.js";

// Router to access Payment related routes
const paymentRouter = express.Router();

// Routes

/**
 * @paymentRouter /api/v1/payment/createOrder
 * @description Create Order for User
 * @access protected
 */
paymentRouter.post('/createOrder', createOrderController );

export default paymentRouter;