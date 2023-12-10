import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [allPagesVisited, setAllPagesVisited] = useState(false);

    const getProductsAsPerPageAndLimit = async () => {

        console.log("Inside it ....");

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/product/get-products/${page}/${limit}`);

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

    useEffect(() => {
        if (allPagesVisited) {
            console.log("Returning as all pages visited.....");
            setLoading(false);
            return;
        }
        getProductsAsPerPageAndLimit();
    }, [page]);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>

                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    <h2>Products</h2>

                    <div className="container d-flex flex-wrap m-2">
                        {products &&
                            products.map((product) => {
                                return <>
                                    <div key={product._id} className="card m-1" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={product.photo}
                                            alt="product-image" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{(product.description).slice(0,30)+"...."}</p>
                                            <p className="card-text">{product.price}</p>
                                            <Link to={`/detailsOfProduct/${product.slug}`} className="btn btn-outline-primary w-100">
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </>

                            })

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
                </main>
            </div>
        </Layout>
    </>;
};

export default Home;