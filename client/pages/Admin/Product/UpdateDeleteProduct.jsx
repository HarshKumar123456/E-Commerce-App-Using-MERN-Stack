import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import AdminMenu from "../AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateDeleteProduct = () => {
    console.log("Bro let us print url params");
    const { productSlug } = useParams();
    console.log(productSlug);

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const [categories, setCategories] = useState(null);
    const [productCategory, setProductCategory] = useState(null);
    const [productDetails, setProductDetails] = useState(null);

    const getAllCategories = async () => {
        console.log("Getting all categories....");
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

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/product/get-product/${productSlug}`);

            if (response?.data?.success) {
                toast.success(response?.data?.message);
                setProductDetails(response?.data?.desiredProduct);
            }
            else {
                toast.error(response?.data?.message);
                setProductDetails(response?.data?.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log();
        }
    };

    useEffect(() => {
        getAllCategories();
        getProduct();
        console.log("printing product details....");
        console.log(productDetails);
    }, [productSlug]);

    const handleChange = (event) => {
        setProductDetails(
            (prevProductDetails) => {
                return { ...prevProductDetails, [event.target.name]: event.target.value };
            }
        );

        console.log(productDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting....");

        try {
            const response = await axios.put(`http://localhost:8000/api/v1/product/update-product/${productSlug}`,
            productDetails,{
                headers: {
                    Authorization: auth?.token || "",
                }
            });

            if(response?.data?.success){
                toast.success(response?.data?.message);
                setTimeout(() => {
                    navigate("/dashboard/admin/products");
                }, 2000);
            }
            else{
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };


    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/product/delete-product/${productSlug}`,
            {
                headers: {
                    Authorization: auth?.token || "",
                }
            });

            if(response?.data?.success){
                toast.success(response?.data?.message);
                setTimeout(() => {
                    navigate("/dashboard/admin/products");
                }, 2000);
            }
            else{
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>
                    <AdminMenu />
                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        {productCategory}
                        <select
                            className="form-select mb-3"
                            onChange={(e) => {
                                setProductCategory(e.target.value);
                                console.log("Category is set to " + productCategory);
                            }}
                        >
                            <option>Select A Category</option>
                            {categories && productDetails && categories.map((category) => {
                                // return <option key={category._id} value={category._id}>{category.name}</option>
                                if (category._id === productDetails.categoryId._id) {
                                    return <option selected key={category._id} value={category._id}>{category.name}</option>
                                }
                                else {
                                    return <option key={category._id} value={category._id}>{category.name}</option>
                                }
                            })}
                        </select>

                        {
                            productDetails &&
                            <>
                                <div className="mb-3">
                                    <label for="productName" className="form-label">Product's Name</label>
                                    <input type="text" name="name" value={productDetails.name} className="form-control" id="productName" onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label for="productDescription" className="form-label">Product's Description</label>
                                    <input type="text" name="description" value={productDetails.description} className="form-control" id="productDescription" onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label for="productPrice" className="form-label">Product's Price</label>
                                    <input type="text" name="price" value={productDetails.price} className="form-control" id="productPrice" onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label for="productPhoto" className="form-label">Product's Photo</label>
                                    <input type="text" name="photo" value={productDetails.photo} className="form-control" id="productPhoto" onChange={handleChange} />
                                </div>
                            </>
                        }
                        <button type="button" className="btn btn-outline-danger w-25 m-4" onClick={
                            () => {
                                let deletionConfirmation = window.prompt(`Enter ${productSlug} to delete the product : `);

                                if (deletionConfirmation === productSlug) {
                                    handleDelete();
                                }
                            }
                        }>Delete</button>
                        <button type="submit" className="btn btn-outline-success w-25 m-4" >Update</button>
                    </form>
                </main>
            </div>
        </Layout>
    </>;
};

export default UpdateDeleteProduct;
