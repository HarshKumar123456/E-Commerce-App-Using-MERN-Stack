import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Layout = (props) => {
    return (
        <>
        <ToastContainer />
        <Header />
        <ToastContainer />
        <main> 
        {props.children}
        </main>
        <Footer />
        </>
    );
};

export default Layout;