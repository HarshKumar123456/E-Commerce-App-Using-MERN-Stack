import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();


    function logout() {
        console.log("Inside logout");
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        toast.success("Logged Out Successfully....");
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    function goBackToHome() {
        toast.success("Going back to Home....");
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    return <>
        <Layout>
            <div className="container d-flex flex-column">
                <h2>Confirm to Logout....</h2>
                <div className="button-container">
                    <button type="button" class="btn btn-outline-danger m-2" onClick={() => { logout() }}>Confirm</button>
                    <button type="button" class="btn btn-outline-success m-2" onClick={() => { goBackToHome() }}>Go Back</button>
                </div>
            </div>
        </Layout>
    </>;
};

export default Logout;