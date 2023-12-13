import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DetailsOfProduct = () => {
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
                                <Link to={`/add-to-cart/${productDetails.slug}`} className="btn btn-outline-warning">
                                    <img width="20" height="20" src="https://img.icons8.com/ios/50/ffffff/shopping-cart--v1.png" alt="shopping-cart--v1" className="mr-2" />
                                    Add to Cart
                                </Link>
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