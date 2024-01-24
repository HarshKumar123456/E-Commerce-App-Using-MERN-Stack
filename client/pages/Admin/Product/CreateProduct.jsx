import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../AdminMenu";


const CreateProduct = () => {
    const serverURI = import.meta.env.VITE_SERVER_URI;

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const [categories, setCategories] = useState(null);
    const [productCategory, setProductCategory] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        price: "",
        description: "",
        photo: "",
        categoryId: "",
    });

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`${serverURI}/api/v1/category/get-all-categories`);
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
        console.log(productDetails);
        console.log(productCategory);

        try {
            const response = await axios.post(`${serverURI}/api/v1/product/create-product/${productCategory}`, productDetails, {
                headers: { Authorization: auth?.token || "" }
            },);

            if (response?.data?.success) {
                toast.success(`${productDetails.name} Added Successfully....`);
                setTimeout(() => {
                    navigate("/dashboard/admin/products");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>
                    <AdminMenu />
                </aside>
                <main style={{ flex: "1", padding: "20px" }}>
                    <div className="container products-container">
                        <h2>Add Product Details</h2>
                        <form onSubmit={handleSubmit}>
                            {productCategory}
                            <select
                                className="form-select mb-3"
                                onChange={(e) => {
                                    setProductCategory(e.target.value);
                                    console.log("Category is set to " + productCategory);
                                }}
                            >
                                <option >Select A Category</option>
                                {categories && categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>

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

                            <button type="submit" className="btn btn-outline-success w-100">Create</button>
                        </form>
                    </div>
                </main>
            </div>
        </Layout>
    </>;
};

export default CreateProduct;