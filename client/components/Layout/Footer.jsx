import React from "react";
import { NavLink,Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="container">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><NavLink to="/" className="nav-link px-2 text-body-secondary">Home</NavLink></li>
                        <li className="nav-item"><NavLink to="/about" className="nav-link px-2 text-body-secondary">About</NavLink></li>
                        <li className="nav-item"><NavLink to="/contact" className="nav-link px-2 text-body-secondary">Contact</NavLink></li>
                        <li className="nav-item"><NavLink to="/policy" className="nav-link px-2 text-body-secondary">Policy</NavLink></li>
                        <li className="nav-item"><NavLink to="/privacy-policy" className="nav-link px-2 text-body-secondary">Privacy Policy</NavLink></li>
                       
                    </ul>
                    <p className="text-center text-body-secondary">© {new Date().getFullYear()} Company, Inc</p>
                </footer>
            </div>
        </>
    );
};

export default Footer;