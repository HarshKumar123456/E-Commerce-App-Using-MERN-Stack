import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";

const DetailsOfProduct = () => {
    const [cart,setCart] = useCart();

    console.log("Inside it...");
    const { productSlug } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    const getProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/product/get-product/${productSlug}`);

            if (response?.data?.success) {
                console.log("Got the product");
                toast.success(response?.data?.message);
                setProductDetails(response?.data?.desiredProduct);
            }
            else {
                toast.error(response?.data?.message);
                setProductDetails(response?.data?.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log();
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [productSlug]);

    // Handle Add to Cart Button Click
    const handleAddToCartButtonClick = (productToAddInCart) => {
        console.log("Inside detail page add to cart click");
        setCart((prev) => {
            const existingItem = prev.find(item => item._id === productToAddInCart._id);
            if (existingItem) {
                return prev;
            }
            const newCart = [...prev,productToAddInCart];
            localStorage.setItem("cart",JSON.stringify(newCart));
            return newCart;
        });
        console.log("cart after adding...");
        console.log(cart);
    };
    return <>
        <Layout>
            {productDetails ? <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="image-container mt-2">
                                <img src={productDetails.photo} alt={productDetails.name + " image"} className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-container mt-2">
                                <h2>{productDetails.name}</h2>
                                <p>
                                    <strong>Description:</strong> {productDetails.description}
                                </p>
                                <p>
                                    <strong>Price:</strong> {productDetails.price}
                                </p>
                                <p>
                                    <strong>Category:</strong> {productDetails.categoryId.name}
                                </p>
                                <button className="btn btn-outline-warning" onClick={() => {
                                                handleAddToCartButtonClick(productDetails);
                                            }}>
                                    <img width="20" height="20" src="https://img.icons8.com/ios/50/ffffff/shopping-cart--v1.png" alt="shopping-cart--v1" className="mr-2" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </> : <>
                <h1>No Product...</h1>
            </>}

        </Layout>
    </>
};


export default DetailsOfProduct;