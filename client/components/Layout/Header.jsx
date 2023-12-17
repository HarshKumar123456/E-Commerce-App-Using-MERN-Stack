import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
    const [cart,setCart] = useCart();
    const [auth, setAuth] = useAuth();

    // console.log("we are saying that inside header the auth is : ");
    // console.log(auth);

    const navigate = useNavigate();

    const [keyword,setKeyword] = useState("");
    const handleSearchKeywordChange = (e) => {
        setKeyword(e.target.value);
    };
    const handleSearchKeywordSubmit = (e) => {
        // Let the page reload whenever the search keyword is submitted
        // e.preventDefault(); 
        // Make this page to navigate to the search product by keyword
        navigate(`/search-product/${keyword}`);
    };
    const [categories, setCategories] = useState(null);

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/category/get-all-categories`);
            const data = response.data;
            console.log("printing all categories");
            console.log(data.allCategories);
            if (data.success) {
                // toast.success("Successfully got all categories....");
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
 
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" >Brand</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form onSubmit={handleSearchKeywordSubmit} className="d-flex flex-grow-1 mx-4">
                        <input
                            className="form-control me-2 flex-grow-1"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={keyword}
                            onChange={handleSearchKeywordChange}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </form>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                {/* <NavLink to="/category" className="nav-link" >Category</NavLink> */}
                                <div className="dropdown">
                                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Category
                                            </button>
                                            <ul className="dropdown-menu">
                                                {categories && categories.map(category => (
                                                    <li key={category._id} className="dropdown-item">
                                                        <NavLink to={`/category/${category._id}`} className="nav-link">
                                                            {category.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                            </li>
                            {auth.user ?
                                (
                                    <>
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li className="dropdown-item">
                                                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="nav-link" >Dashboard</NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink to="/logout" className="nav-link" >Log Out</NavLink>
                                                </li>

                                            </ul>
                                        </div>


                                    </>
                                )
                                :
                                (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link" >Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link" >Login</NavLink>
                                        </li>
                                    </>
                                )}
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link" >Cart ({cart?.length})</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;