import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const Register = () => {
    const initialUserData = {
        name: "",
        email: "",
        phone: "",
        password: "",
        address: ""
    };
    const [userData, setUserData] = useState(initialUserData);
    async function handleSubmit(event) {
        event.preventDefault();
        console.log(userData);
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