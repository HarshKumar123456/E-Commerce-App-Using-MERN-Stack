import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const serverURI = import.meta.env.VITE_SERVER_URI;

    const navigate = useNavigate();
    const location = useLocation();

    const [auth,setAuth] = useAuth();

    const initialUserData = {
        email: "",
        password: "",
    };
    const [userData, setUserData] = useState(initialUserData);
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(userData);

        try {
            const response = await axios.post(`${serverURI}/api/v1/auth/login`, userData);
            console.log(response.data);

            if (response.data.success) {
                console.log("Toast kha lo");
                toast.success("Congrats!! You are Logged in now....");
                toast.error(`${response.data.message}`);
                setAuth({...auth,user: response.data.user,token: response.data.token});
                localStorage.setItem("auth",JSON.stringify(response.data));
                setTimeout(() => {
                    navigate(location.state || "/");
                },2000);
            }
            else {
                toast.error(`${response.data.message}`);
                setAuth({...auth,user: null,token: ""});
                localStorage.removeItem("auth");
                setTimeout(() => {
                    navigate("/login");
                },2000);
            }

        } catch (error) {
            console.error(error);
            toast.error(`${error.message}`);
            setAuth({...auth,user: null,token: ""});
            localStorage.removeItem("auth");
            setTimeout(() => {
                navigate("/login");
            },2000);
        }

    }

    function handleChange(event) {
        setUserData(
            (prevUserData) => {
                return { ...prevUserData, [event.target.name]: event.target.value };
            }
        );
    }

    return <>
        <Layout>
            <div className="form-signin w-75 m-auto">
                <form onSubmit={handleSubmit}>
                    <img width="64" height="64" src="https://img.icons8.com/arcade/64/key.png" alt="key" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>


                    <div className="form-floating">
                        <input required name="email" value={userData.email} onChange={handleChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input required name="password" value={userData.password} onChange={handleChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>



                    <Link to={"/forgot-password"} className="btn btn-outline-primary w-50 py-2">Forgot Password</Link>
                    <button className="btn btn-outline-success w-50 py-2" type="submit">Sign In</button>
                    <p className="mt-5 mb-3 text-body-secondary">© 2004–{new Date().getFullYear()}</p>
                </form>
            </div>
        </Layout>
    </>;
};

export default Login;