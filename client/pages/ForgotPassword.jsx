import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const serverURI = import.meta.env.VITE_SERVER_URI;

    const navigate = useNavigate();
    const location = useLocation();

    const initialUserData = {
        email: "",
        newPassword: "",
        securityQuestionKaAnswer: "",
    };
    const [userData, setUserData] = useState(initialUserData);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(userData);

        try {
            const response = await axios.post(`${serverURI}/api/v1/auth/forgot-password`, userData);
            console.log(response.data);

            if (response.data.success) {
                console.log("Toast kha lo");
                toast.success("Congrats!! Your password has been changed....");
                toast.error(`${response.data.message}`);
                setTimeout(() => {
                    navigate("/login");
                },2000);
            }
            else {
                toast.error(`${response.data.message}`);
                setTimeout(() => {
                    navigate("/forgot-password");
                },2000);
            }

        } catch (error) {
            console.error(error);
            toast.error(`${error.message}`);
            setTimeout(() => {
                navigate("/forgot-password");
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
                    <h1 className="h3 mb-3 fw-normal">Reset Password</h1>


                    <div className="form-floating">
                        <input required name="email" value={userData.email} onChange={handleChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input required name="securityQuestionKaAnswer" value={userData.securityQuestionKaAnswer} onChange={handleChange} type="text" className="form-control" id="floatingSecurityQuestion" placeholder="Favourite like Code,Coding etc." />
                        <label htmlFor="floatingSecurityQuestion">Security Question's Answer</label>
                    </div>

                    <div className="form-floating">
                        <input required name="newPassword" value={userData.newPassword} onChange={handleChange} type="password" className="form-control" id="floatingPassword" placeholder="New Password" />
                        <label htmlFor="floatingNewPassword">New Password</label>
                    </div>



                    <Link to={"/login"} className="btn btn-outline-primary w-50 py-2" >Login</Link>
                    <button className="btn btn-outline-success w-50 py-2" type="submit">Change Password</button>
                    <p className="mt-5 mb-3 text-body-secondary">© 2004–{new Date().getFullYear()}</p>
                </form>
            </div>
        </Layout>
    </>;
};

export default ForgotPassword;