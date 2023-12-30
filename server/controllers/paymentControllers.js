import "dotenv/config";
import Razorpay from "razorpay";

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
        console.log("Order is created successfully of amount " + amount + " and order id is  : "+ order.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};

export {createOrderController};