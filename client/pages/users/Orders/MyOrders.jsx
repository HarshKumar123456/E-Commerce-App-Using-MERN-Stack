import React from "react";
import Layout from "../../../components/Layout/Layout";
import UserMenu from "../UserMenu";
import { Link } from "react-router-dom";

const MyOrders = () => {
    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>
                    <UserMenu />
                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    <h2>Welcome to My Orders Page</h2>
                    
                </main>
            </div>
        </Layout>
    </>;
};

export default MyOrders;