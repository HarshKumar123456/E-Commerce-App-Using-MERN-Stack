import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const serverURI = import.meta.env.VITE_SERVER_URI;

    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();

    const initialUserData = {
        name: "",
        email: "",
        phone: "",
        password: "",
        securityQuestionKaAnswer: "",
        address: ""
    };
    const [userData, setUserData] = useState(initialUserData);
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(userData);

        try {
            const response = await axios.post(`${serverURI}/api/v1/auth/register`, userData);
            console.log(response.data);

            if (response.data.success) {
                console.log("Toast kha lo");
                toast.success("Congrats!! You are registered now....");
                toast.error(`${response.data.message}`);
                setAuth({ ...auth, user: response.data.user, token: response.data.token });
                localStorage.setItem("auth", JSON.stringify(response.data));
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
            else {
                toast.error(`${response.data.message}`);
                setAuth({ ...auth, user: null, token: "" });
                localStorage.removeItem("auth");
                setTimeout(() => {
                    navigate("/register");
                }, 2000);
            }

        } catch (error) {
            console.error(error);
            toast.error(`${error.message}`);
            setAuth({ ...auth, user: null, token: "" });
            localStorage.removeItem("auth");
            setTimeout(() => {
                navigate("/register");
            }, 2000);
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
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input required name="name" value={userData.name} onChange={handleChange} type="text" className="form-control" id="floatingName" placeholder="Name" />
                        <label htmlFor="floatingName">Name</label>
                    </div>
                    <div className="form-floating">
                        <input required name="email" value={userData.email} onChange={handleChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input required name="phone" value={userData.phone} onChange={handleChange} type="tel" className="form-control" id="floatingPhone" placeholder="+919876543210" />
                        <label htmlFor="floatingPhone">Phone</label>
                    </div>
                    <div className="form-floating">
                        <input required name="password" value={userData.password} onChange={handleChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating">
                        <input required name="securityQuestionKaAnswer" value={userData.securityQuestionKaAnswer} onChange={handleChange} type="text" className="form-control" id="floatingsecurityQuestionKaAnswer" placeholder="What is your favourite ?" />
                        <label htmlFor="floatingsecurityQuestionKaAnswer">Security Question's Answer</label>
                    </div>
                    <div className="form-floating">
                        <input required name="address" value={userData.address} onChange={handleChange} type="text" className="form-control" id="floatingAddress" placeholder="Address" />
                        <label htmlFor="floatingAddress">Address</label>
                    </div>


                    <button className="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
                    <p className="mt-5 mb-3 text-body-secondary">© 2004–{new Date().getFullYear()}</p>
                </form>
            </div>
        </Layout>
    </>;
};

export default Register;