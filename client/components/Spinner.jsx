import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [timeLeftToNavigate, setTimeLeftToNavigate] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeftToNavigate((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        if (timeLeftToNavigate === 0) {
            clearInterval(interval);
            navigate("/login");
        }
        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [timeLeftToNavigate,navigate]);

    return (
        <>
            <h2 className="d-inline mx-2">Redirecting you to Log in page in {timeLeftToNavigate} seconds</h2>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </>
    );
};

export default Spinner;