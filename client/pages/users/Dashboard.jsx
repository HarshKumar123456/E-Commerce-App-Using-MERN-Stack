import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./UserMenu";
import { useCart } from "../../context/cart";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [cart, setCart] = useCart();

    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>
                    <UserMenu />
                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    <h2>Welcome to The Dashboard !!</h2>
                    <h4>Your Cart has {cart?.length} items in it.</h4>
                    <Link to={"/cart"} className="btn btn-outline-warning">
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/ffffff/shopping-cart--v1.png" alt="shopping-cart--v1" className="mr-2" />
                        Go to Cart
                    </Link>
                </main>
            </div>
        </Layout>
    </>;
};

export default Dashboard;