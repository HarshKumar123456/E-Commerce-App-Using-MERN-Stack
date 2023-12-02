import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import { useAuth } from "../../../context/auth";


import EditCategoryModal from "./EditCategoryModal";

const Categories = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleEditButtonClick = (category) => {
        setSelectedCategory(category);
        setEditModalOpen(true);
    };

    const [auth, setAuth] = useAuth();

    const [categories, setCategories] = useState(null);
    const [createFormVisibleStatus, setCreateFormVisibleStatus] = useState(false);

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/category/get-all-categories`);
            const data = response.data;
            console.log("printing all categories");
            console.log(data.allCategories);
            if (data.success) {
                toast.success("Successfully got all categories....");
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

    const handleCreateButtonClick = () => {
        setCreateFormVisibleStatus(!createFormVisibleStatus);
    };

    const handleCreateFormSubmit = async (name) => {
        console.log("we are inside the create submit in parent....");
        // console.log(name);
        console.log(auth?.token);
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/category/create-category`, {
                name: name,
            }, {
                headers: { Authorization: auth?.token || "" }
            },);
            console.log(response.data);
            const data = response.data;
            if (data.success) {
                toast.success(data.message);
                setCreateFormVisibleStatus(!createFormVisibleStatus);
                getAllCategories();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleEditFormSubmit = async (idOfCategory, newName) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/category/update-category/${idOfCategory}`,
                { name: newName },
                {
                    headers: { Authorization: auth?.token || "" }
                }
            );
            const data = response.data;
            if (data.success) {
                toast.success(data.message);
                getAllCategories();
                handleCloseModal();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating category");
        }
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };

    const handleDeleteButtonClick = async (idOfCategory) => {
        console.log("Delete button clicked....");
        console.log(idOfCategory);
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${idOfCategory}`, {
                headers: { Authorization: auth?.token || "" }
            },);
            console.log(response.data);
            const data = response.data;
            if (data.success) {
                toast.success(data.message);
                getAllCategories();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
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
                    <div className="d-flex justify-content-between p-2">
                        <h2>Categories</h2>
                        <button className="btn btn-outline-light" onClick={handleCreateButtonClick}>
                            Add New+
                        </button>
                    </div>
                    {createFormVisibleStatus && <CategoryForm name={""} onSave={handleCreateFormSubmit} />}
                    {selectedCategory && (
                        <EditCategoryModal
                            category={selectedCategory}
                            isOpen={editModalOpen}
                            onClose={handleCloseModal}
                            onSave={handleEditFormSubmit}
                        />
                    )}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name Of Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories && categories.map((category) => (
                                <tr key={category._id}>
                                    <td>
                                        {category.name}
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-outline-primary mx-2" onClick={() => {

                                            handleEditButtonClick(category);

                                        }}>Edit</button>
                                        <button type="button" className="btn btn-outline-danger mx-2" onClick={() => handleDeleteButtonClick(category._id)}>Delete</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </Layout>
    </>;
};

export default Categories;