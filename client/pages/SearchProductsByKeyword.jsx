import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useCart } from "../context/cart";

const SearchProductsByKeyword = () => {
    const [cart,setCart] = useCart();
    const { keyword } = useParams();

    const [productsByKeyword, setProductsByKeyword] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [loading, setLoading] = useState(false);
    const [allPagesVisited, setAllPagesVisited] = useState(false);

    const getProductsByKeyword = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/product/search-products/${keyword}/${page}/${limit}`)

            if (response?.data?.success) {
                if (response?.data?.data.length === 0) {
                    setAllPagesVisited(true);
                }
                setProductsByKeyword(
                    (prev) => {
                        let data = [...prev, ...response?.data?.data];

                        let uniqueProductsArray = data.reduce((accumulatorArray, currentElement) => {
                            let existingItem = accumulatorArray.find(item => item._id === currentElement._id);

                            if (!existingItem) {
                                accumulatorArray.push(currentElement);
                            }

                            return accumulatorArray;
                        }, []);

                        return [...uniqueProductsArray];
                    }
                );
                setLoading(false);
            }
            else {
                toast.error(response?.data?.message);
                setLoading(false);
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 20 >=
            document.documentElement.scrollHeight && !loading
        ) {
            setLoading(true);
            setPage((prev) => {
                return prev + 1;
            });
        }
    };

    useEffect(() => {
        if (allPagesVisited) {
            setLoading(false);
            console.log("Returning as pages visited...");
            return;
        }
        getProductsByKeyword();
    }, [page, allPagesVisited]);



    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle Add to Cart Button Click
    const handleAddToCartButtonClick = (productToAddInCart) => {
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
            <div className="d-flex flex-wrap m-2">
                {productsByKeyword &&
                    productsByKeyword.map((product) => {
                        return <>
                            <div key={product._id} className="card m-1" style={{ width: "18rem" }}>
                                <img className="card-img-top" src={product.photo}
                                    alt="product-image" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{(product.description).slice(0, 30) + "...."}</p>
                                    <p className="card-text">{product.price}</p>
                                    <Link to={`/detailsOfProduct/${product.slug}`} className="btn btn-outline-primary w-50">
                                        More Info
                                    </Link>
                                    <button className="btn btn-outline-warning" onClick={() => {
                                                handleAddToCartButtonClick(product);
                                            }}>
                                        <img width="20" height="20" src="https://img.icons8.com/ios/50/ffffff/shopping-cart--v1.png" alt="shopping-cart--v1" className="mr-2" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </>

                    })

                }

                {productsByKeyword?.length === 0 && <>
                    {"No Products Available for now...."}
                </>}

                {loading && <>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </>}

                {allPagesVisited && <>
                    <p>All products Viewed</p>
                </>}
            </div>
        </Layout>
    </>;
};

export default SearchProductsByKeyword;