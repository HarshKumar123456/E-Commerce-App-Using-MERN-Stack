import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";

const AdminDashboard = () => {
    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>
                    <AdminMenu />
                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    <h2>Welcome to The Admin Panel !!</h2>
                </main>
            </div>
        </Layout>
    </>;
};

export default AdminDashboard;