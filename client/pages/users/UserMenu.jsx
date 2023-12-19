import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
    return <>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to={"/dashboard/user/home"} className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={"/dashboard/user/profile"} className="nav-link">Profile</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={"/dashboard/user/orders"} className="nav-link">Orders</NavLink>
            </li>
        </ul>
    </>;
};

export default UserMenu;