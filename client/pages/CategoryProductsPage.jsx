import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";

const CategoryProductsPage = () => {
    const [cart, setCart] = useCart();
    const { categoryId } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [allPagesVisited, setAllPagesVisited] = useState(false);

    const getProductsAsPerPageAndLimit = async () => {

        console.log("Inside it ....");

        try {
            // Pass category To URL
            const categoriesString = categoryId;
            const response = await axios.get(`http://localhost:8000/api/v1/product/get-products/${page}/${limit}?categories=${categoriesString}`);

            if (response?.data?.success) {
                console.log("Data received for page no " + page);
                console.log(response?.data?.data);

                if (response?.data?.data.length === 0) {
                    setAllPagesVisited(true);
                }
                setProducts(prev => {
                    let data = [...prev, ...response?.data?.data];

                    // Filter elements having unique IDs
                    const uniqueProducts = data.reduce((accumulator, current) => {
                        // Check if the accumulator already contains an element with the same ID
                        const existingItem = accumulator.find(item => item._id === current._id);

                        // If not found, add the element to the accumulator array
                        if (!existingItem) {
                            accumulator.push(current);
                        }

                        return accumulator;
                    }, []);
                    return [...uniqueProducts];
                });

                setLoading(false);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const handleScroll = async () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 20 >=
            document.documentElement.scrollHeight
        ) {
            setLoading(true);
            setPage(prev => prev + 1);
        }
    };

    // Handle Add to Cart Button Click
    const handleAddToCartButtonClick = (productToAddInCart) => {
        setCart((prev) => {
            const existingItem = prev.find(item => item._id === productToAddInCart._id);
            if (existingItem) {
                return prev;
            }
            const newCart = [...prev, productToAddInCart];
            localStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
        console.log("cart after adding...");
        console.log(cart);
    };

    // On Change in Category Id in URL resetting everything and loading products again .
    useEffect(() => {
        setAllPagesVisited(false);
        setProducts([]);
        setPage(1);
        setLoading(false);
        // console.log("as categoryid changed thus we are setting " + new Date().getTime());
        // console.log(allPagesVisited);
        // console.log(products);
    }, [categoryId]);

    useEffect(() => {
        if (allPagesVisited) {
            console.log("Returning as all pages visited.....");
            setLoading(false);
            return;
        }
        getProductsAsPerPageAndLimit();
    }, [page, categoryId]);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <>
        <Layout>
            <h1>This is Category Products Page</h1>
            <div className="d-flex flex-wrap m-2">
                {products &&
                    products.map((product) => (
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
                    ))

                }

                {products?.length === 0 && <>
                    {"No Products Available for now...."}
                </>}
            </div>

            {loading && <>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </>}

            {allPagesVisited && <>
                <p>All products Viewed</p>
            </>}
        </Layout>
    </>;
};

export default CategoryProductsPage;