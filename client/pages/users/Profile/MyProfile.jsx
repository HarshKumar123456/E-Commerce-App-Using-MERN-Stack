import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import UserMenu from "../UserMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
    const [auth, setAuth] = useAuth();

    const initialUserData = { ...auth?.user, password: "" };
    const [userData, setUserData] = useState(initialUserData);

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log("Inside submit we got data");
        console.log(userData);

        try {
            const response = await axios.put(`http://localhost:8000/api/v1/auth/update-profile`, userData, {
                headers: {
                    Authorization: auth?.token || "",
                }
            });

            if (response?.data?.success) {
                toast.success(response?.data?.message);
                console.log(response?.data?.userAfterUpdatedProfile);

                // Create a new object reference for auth without mutation
                const updatedAuth = {
                    ...auth,
                    user: response?.data?.userAfterUpdatedProfile,
                };

                // Update the auth state with the new object reference
                setAuth(updatedAuth);

                // Update localStorage 
                localStorage.setItem("auth", JSON.stringify(updatedAuth));
            }
            else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    function handleChange(event) {
        setUserData(
            (prevUserData) => {
                return { ...prevUserData, [event.target.name]: event.target.value };
            }
        );
        // console.log("changing field" + event.target.name);
    }
    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>
                    <UserMenu />
                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    <h2>Welcome to My Profile Page</h2>
                    <div className="form-signin w-75 m-auto">
                        <form onSubmit={handleSubmit}>
                            <img width="64" height="64" src="https://img.icons8.com/arcade/64/key.png" alt="key" />
                            <h1 className="h3 mb-3 fw-normal">Update Profile</h1>

                            <div className="form-floating">
                                <input name="name" value={userData.name} onChange={handleChange} type="text" className="form-control" id="floatingName" placeholder="Name" />
                                <label htmlFor="floatingName">Name</label>
                            </div>
                            <div className="form-floating">
                                <input name="email" value={userData.email} onChange={handleChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" disabled />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input name="phone" value={userData.phone} onChange={handleChange} type="tel" className="form-control" id="floatingPhone" placeholder="+919876543210" />
                                <label htmlFor="floatingPhone">Phone</label>
                            </div>
                            <div className="form-floating">
                                <input name="password" value={userData.password} onChange={handleChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating">
                                <input name="address" value={userData.address} onChange={handleChange} type="text" className="form-control" id="floatingAddress" placeholder="Address" />
                                <label htmlFor="floatingAddress">Address</label>
                            </div>


                            <button className="btn btn-primary w-100 py-2" type="submit">Update</button>
                            <p className="mt-5 mb-3 text-body-secondary">© 2004–{new Date().getFullYear()}</p>
                        </form>
                    </div>
                </main>
            </div>
        </Layout>
    </>;
};

export default MyProfile;