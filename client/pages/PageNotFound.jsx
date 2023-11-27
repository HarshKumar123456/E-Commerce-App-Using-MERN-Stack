import React from "react";
import Layout from "../components/Layout/Layout";

const PageNotFound = () => {
    return <>
        <Layout>
            <div className="container">
                <div className="visual-content-container">
                    <video width="320" height="240" autoPlay muted loop>
                        <source src="../src/assets/videos/page-not-found.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="textual-container">
                    <h2>
                        404 : Page Not Found....
                    </h2>
                    <p>Sorry, the page you are looking for is not found....</p>
                </div>
            </div>
        </Layout>
    </>;
};

export default PageNotFound;