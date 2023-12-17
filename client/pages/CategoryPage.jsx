import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const CategoryPage = () => {
    const [categories, setCategories] = useState(null);

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/category/get-all-categories`);
            const data = response.data;
            console.log("printing all categories");
            console.log(data.allCategories);
            if (data.success) {
                // toast.success("Successfully got all categories....");
                setCategories(data.allCategories);
                console.log("printing categories");
                console.log(categories);
            }
            else {
                toast.error(data.message);
                setCategories(null);
            }

        } catch (error) {
            toast.error("Error getting all categories....");
            toast.error(error.message);
            setCategories(null);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);
    return <>
        <Layout>
            <div className="container mt-4">

                <h1>This is categories page....</h1>
                <div className="row">
                    {categories &&
                        categories.map((category) => (
                            <div key={category._id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <NavLink to={`/category/${category._id}`} className="text-decoration-none text-reset">
                                                {category.name}
                                            </NavLink>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    </>;
};

export default CategoryPage;