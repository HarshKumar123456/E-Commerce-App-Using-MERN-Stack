import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const getTotalPrice = () => {
        let priceOfProducts = 0;
        cart.forEach(product => {
            priceOfProducts = priceOfProducts + parseInt(product.price);
        });

        return priceOfProducts;
    }

    const handleRemoveFromCartButtonClick = (productId) => {
        setCart(prev => {
            const newCart = prev.filter(product => {
                return product._id !== productId;
            });
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
    };

    // Handle Cart Button Click
    const handleCheckoutButtonClick = async (e) => {
        // If User is Logged In Then Proceed To Payment Gateway Portal Else Let the User redirect to the Login Page 
        if (auth?.user) {
            // navigate(`/checkout/payment-page`);
            let amount = getTotalPrice();
            if (amount === 0) {
                alert("Oops your cart is empty. Please Shop now....");
                navigate("/");
                return;
            }

            // As in the logic of Razorpay payment amount is taken in paise so convert this amount in paise
            amount = amount * 100;
            try {
                const response = await axios.post(`http://localhost:8000/api/v1/payment/createOrder`,
                    { amount },
                );

                const order = await response.data;
                console.log(order);

                if (order.id) {
                    var options = {
                        "key": import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        "currency": "INR",
                        "name": import.meta.env.VITE_BUSINESS_NAME, //your business name
                        "description": "Payment for Order",
                        "image": import.meta.env.VITE_BRAND_LOGO_IMAGE_URL,
                        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        "handler": async function (response) {
                            // alert(response.razorpay_payment_id);
                            // alert(response.razorpay_order_id);
                            // alert(response.razorpay_signature);
                            const paymentVerificableData = {
                                ...response,
                            };

                            try {
                                const validatePaymentResponse = await axios.post(`http://localhost:8000/api/v1/payment/verify-payment`, paymentVerificableData);

                                const dataOfResponse = validatePaymentResponse.data;
                                console.log(dataOfResponse);
                                if (dataOfResponse?.success) {
                                    toast.success(dataOfResponse?.message);
                                }
                                else {
                                    toast.error(dataOfResponse?.message);
                                }
                            } catch (error) {
                                console.log(error);
                                toast.error(error.message);
                            }
                        },
                        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                            "name": auth?.user?.name, //your customer's name
                            "email": auth?.user?.email,
                            "contact": auth?.user?.phone,  //Provide the customer's phone number for better conversion rates 
                        },
                        "notes": {
                            "address": auth?.user?.address,
                        },
                        "theme": {
                            "color": "#000000",
                        }
                    };

                    console.log("We are inside this order.id if condition : ");
                    var rzp1 = new window.Razorpay(options);
                    rzp1.on('payment.failed', function (response) {
                        alert(response.error.code);
                        alert(response.error.description);
                        alert(response.error.source);
                        alert(response.error.step);
                        alert(response.error.reason);
                        alert(response.error.metadata.order_id);
                        alert(response.error.metadata.payment_id);
                    });
                    rzp1.open();
                    e.preventDefault();

                    console.log("Hey Dude mauj aa gayi na bolo bolo haan haan haan....");
                    toast.success("Order Created Successfully....");
                } else {
                    toast.error("Failed to create order....");
                }
            } catch (error) {
                console.error('Error initiating payment:', error);
                toast.error(error.message);
            }


        }
        else {
            navigate(`/login`, {
                state: "/cart",
            });
        }
    };

    return <>
        <Layout>
            <div className="container flex-wrap m-2">
                <h1>Your Cart </h1>
                <h4>{cart?.length} items</h4>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-sm-8">
                            {cart &&
                                cart.map((product) => {
                                    return <>
                                        <div key={product._id} className="row m-1 p-2 border">
                                            <Link to={`/detailsOfProduct/${product.slug}`} className="col-sm-2">
                                                <img src={product.photo} className="img-fluid" alt="product-image" />
                                            </Link>
                                            <div className="col-sm-7">
                                                <h5 className="mb-0">{product.name}</h5>
                                                <p className="mb-0"><strong>Price:</strong> {product.price}</p>

                                            </div>
                                            <div className="col-sm-3 d-flex align-items-center justify-content-end">
                                                <button className="btn btn-outline-danger" onClick={() => {
                                                    handleRemoveFromCartButtonClick(product._id)
                                                }}>Remove</button>
                                            </div>
                                        </div>

                                    </>

                                })

                            }
                        </div>
                        <div className="col-sm-4">
                            <div className="p-3 m-3 border">
                                <h2>Total</h2>
                                <h4>{getTotalPrice()} Rs.</h4>
                                <button className="btn btn-outline-success w-100" onClick={handleCheckoutButtonClick}>
                                    Checkout
                                </button>
                            </div>

                            {auth?.user ? <>
                                <div className="p-3 m-3 border">
                                    <h2>Deliver to:</h2>
                                    <h4>{auth?.user.address}</h4>
                                    <button className="btn btn-outline-light w-100" onClick={() => navigate(`/dashboard/user/profile`)}>
                                        Update Address
                                    </button>
                                </div>
                            </> : <>
                                <div className="p-3 m-3 border">
                                    Please Login Before Checkout
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
                {cart?.length === 0 && <>
                    {"No Products Added in Cart for now. Try Out Shopping...."}
                </>}
            </div>
        </Layout>
    </>;
};

export default CartPage;