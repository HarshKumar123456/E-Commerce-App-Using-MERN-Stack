import React from "react";
import Layout from "../../components/Layout/Layout";

const Dashboard = () => {
    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>

                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    Main content area

                </main>
            </div>
        </Layout>
    </>;
};

export default Dashboard;