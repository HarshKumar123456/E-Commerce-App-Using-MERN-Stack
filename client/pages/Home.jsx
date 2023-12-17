import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";

const Home = () => {
    const [cart,setCart] = useCart();

    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [allPagesVisited, setAllPagesVisited] = useState(false);

    const [categories, setCategories] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/category/get-all-categories`);
            const data = response.data;
            console.log("printing all categories");
            console.log(data.allCategories);
            if (data.success) {
                toast.success("Successfully got all categories....");
                setCategories(data.allCategories);
                console.log("printing categories");
                console.log(categories);
            }
            else {
                toast.error(data.message);
                setCategories(null);
            }

        } catch (error) {
            toast.error("Error getting all categories....");
            toast.error(error.message);
            setCategories(null);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const getProductsAsPerPageAndLimit = async () => {

        console.log("Inside it ....");

        try {
            const categoriesString = selectedCategories.join(',');
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

    // Handle category selection change
    const handleCategoryChange = (category) => {
        const index = selectedCategories.indexOf(category);
        if (index === -1) {
            setSelectedCategories([...selectedCategories, category]);
        } else {
            const newCategories = [...selectedCategories];
            newCategories.splice(index, 1);
            setSelectedCategories(newCategories);
        }

        // Reset page to 1 when category changes
        setPage(1);
        setAllPagesVisited(false);
        setProducts([]);
        console.log("page value is now " + page);
        console.log("categories selected are ");
        console.log(selectedCategories);

    };

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

    useEffect(() => {
        if (allPagesVisited) {
            console.log("Returning as all pages visited.....");
            setLoading(false);
            return;
        }
        getProductsAsPerPageAndLimit();
    }, [page, selectedCategories]);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>

                    <h5>Category Filter</h5>
                    {categories && categories.map((category) => (
                        <div key={category._id}>
                            <input
                                type="checkbox"
                                id={category._id}
                                checked={selectedCategories.includes(category._id)}
                                onChange={() => handleCategoryChange(category._id)}
                            />
                            <label htmlFor={category._id}>{category.name}</label>
                        </div>
                    ))}
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