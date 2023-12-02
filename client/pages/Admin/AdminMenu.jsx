import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return <>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to={"/dashboard/admin"} className="nav-link">Admin Panel</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={"/dashboard/admin/categories"} className="nav-link">Categories</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={"/dashboard/admin/products"} className="nav-link">Products</NavLink>
            </li>
        </ul>
    </>;
};

export default AdminMenu;