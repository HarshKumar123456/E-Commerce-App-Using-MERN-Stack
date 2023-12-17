import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdminMenu from "../AdminMenu";

const Products = () => {
    const [products, setProducts] = useState(null);

    const getAllProducts = async () => {
        console.log("Getting all products");

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/product/get-all-products`);
            if (response?.data?.success) {
                toast.success("Got all products....");
                console.log(response?.data?.allProducts);
                setProducts(response?.data?.allProducts);
                console.log("The products are");
                console.log(products);
            }
            else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    };

    useEffect(() => {
        getAllProducts();
    }, []);


    return <>
        <Layout>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <aside style={{ width: "250px", backgroundColor: "black", padding: "20px" }}>
                    <h2>Brand</h2>
                    <AdminMenu />
                </aside>
                <main style={{ flex: "1", padding: "20px" }}>

                    <Link to={"/dashboard/admin/create-product"} className="btn btn-outline-success w-100">
                        Add New Product
                    </Link>
                    <div className="container d-flex flex-wrap m-2">
                        {products &&
                            products.map((product) => {
                                return <>
                                    <div key={product._id} className="card m-1" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={product.photo}
                                            alt="product-image" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text">{product.price}</p>
                                            <Link to={`/dashboard/admin/updateDeleteProduct/${product.slug}`} className="btn btn-outline-primary w-100">
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </>

                            })

                        }

                        {products?.length === 0 && <>
                        {"No Products Available for now...."}
                        </>}
                    </div>
                </main>
            </div>
        </Layout>
    </>;
};

export default Products;