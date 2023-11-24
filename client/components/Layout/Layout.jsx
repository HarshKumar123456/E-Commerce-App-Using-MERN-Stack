import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <>
        <Header />
        <main> 
        This is Layout....
        {props.children}
        </main>
        <Footer />
        </>
    );
};

export default Layout;