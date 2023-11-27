import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import { useAuth } from "../../context/auth";
import axios from "axios";

const PrivateRouteAccess = (props) => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/auth/is-signed-in`, {
                    headers: {Authorization: auth?.token || ""}
                });
                // Process response or set state based on the response
                console.log("We're here");
                console.log(response.data);

                if (response.data.isSignedIn) {
                    setIsUserSignedIn(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error or set state for error
            }
        };

        fetchData();
        // Add auth as a dependency if you want this effect to re-run when auth changes
    }, [auth?.token]);


    return isUserSignedIn ? <Outlet  /> : <Spinner />;
};

export default PrivateRouteAccess;