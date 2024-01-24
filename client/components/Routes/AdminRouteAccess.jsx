import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import { useAuth } from "../../context/auth";
import axios from "axios";

const AdminRouteAccess = (props) => {
    const serverURI = import.meta.env.VITE_SERVER_URI;

    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverURI}/api/v1/auth/is-user-admin`, {
                    headers: { Authorization: auth?.token || "" }
                });
                // Process response or set state based on the response
                console.log("We're here");
                console.log(response.data);

                if (response.data.isSignedIn && response.data.isAdmin) {
                    setIsUserAdmin(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error or set state for error
            }
        };

        fetchData();
        // Add auth as a dependency if you want this effect to re-run when auth changes
    }, [auth?.token]);


    return isUserAdmin ? <Outlet /> : <Spinner />;
};

export default AdminRouteAccess;