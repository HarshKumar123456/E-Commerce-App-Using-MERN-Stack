import "dotenv/config";
import Razorpay from "razorpay";
import crypto from "crypto";

// Razorpay object to access its functionality
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createOrderController = async (req, res) => {
    const amount = req.body.amount; // Amount in paise
    const currency = 'INR';

    const options = {
        amount,
        currency,
        receipt: 'order_receipt',
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log("Order is created successfully of amount " + amount + " and order id is  : " + order.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};

const verifyPaymentController = async (req, res) => {
    
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    // Concatenate razorpay_order_id and razorpay_payment_id
    const data = razorpay_order_id + '|' + razorpay_payment_id;

    // Create an HMAC SHA256 hash
    const generated_signature = crypto.createHmac('sha256', secret).update(data).digest('hex');

    // Compare the signatures
    if (generated_signature === razorpay_signature) {
        // Payment is successful
        console.log('Payment is successful');
        return res.status(200).json({
            success: true,
            message: "Payment Verified Successfully....",
            order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
        });
    } else {
        // Payment verification failed
        console.log('Payment verification failed');
        return res.status(400).json({
            success: false,
            message: "Payment verification failed....",
            order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
        });
    }
};

export { createOrderController,verifyPaymentController };