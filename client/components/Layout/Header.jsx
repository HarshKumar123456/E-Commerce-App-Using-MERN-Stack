import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Header = () => {
    const [auth, setAuth] = useAuth();

    // console.log("we are saying that inside header the auth is : ");
    // console.log(auth);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" >Brand</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" aria-current="page" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link" >Category</NavLink>
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
                                <NavLink to="/cart" className="nav-link" >Cart ({0})</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;