import express from "express";
import { isRegisteredUserTokenIsPresentMiddleware } from "../middlewares/authMiddleware.js";
import { createOrderController, verifyPaymentController } from "../controllers/paymentControllers.js";

// Router to access Payment related routes
const paymentRouter = express.Router();

// Routes

/**
 * @paymentRouter /api/v1/payment/createOrder
 * @description Create Order for User
 * @access protected
 */
paymentRouter.post('/createOrder', createOrderController );

/**
 * @paymentRouter /api/v1/payment/verify-payment
 * @description Verifying Payment authenticity
 * @access public
 */
paymentRouter.post('/verify-payment', verifyPaymentController );

export default paymentRouter;