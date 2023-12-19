import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

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
    const handleCheckoutButtonClick = () => {
        // If User is Logged In Then Proceed To Payment Gateway Portal Else Let the User redirect to the Login Page 
        if (auth?.user) {
            navigate(`/checkout/payment-page`);
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