import "dotenv/config";
import slugify from "slugify";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

const getProductsAsPerPageAndLimitController = async (req, res) => {
    // console.log("Inside getProductsAsPerPageAndLimitController");
    // console.log(req.params);

    try {
        const page = parseInt(req.params.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.params.limit) || 10; // Default to 10 products per page if not specified
        const categories = req.query.categories; // Get categories from query parameters
        console.log("category in params is....");
        console.log(categories);

        let query = {};

        if (categories) {
            const categoryArray = categories.split(',');
            console.log(categoryArray);
            query = { categoryId: { $in: categoryArray } };
        }

        // console.log(page + " ---- " + limit );
        const products = await Product.find(query)
            .limit(parseInt(limit)) // Limit the number of results per page
            .skip((page - 1) * limit); // Calculate the offset based on the page number

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products per page",
            error: error.message
        });
    }
};

const searchProductsByKeywordAndPageAndLimitController = async (req,res) => {
    // console.log("Inside getProductsAsPerPageAndLimitController");
    // console.log(req.params);
    
    try {
        const keyword = req.params.keyword;
        const page = parseInt(req.params.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.params.limit) || 10; // Default to 10 products per page if not specified

        let query = {};

         // If keyword to search is provided, perform a text search on name and description fields
         if (keyword) {
            query.$or = [
                { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive regex search for name
                { description: { $regex: keyword, $options: 'i' } } // Case-insensitive regex search for description
            ];
        }

        // console.log(page + " ---- " + limit );
        const products = await Product.find(query)
            .limit(parseInt(limit)) // Limit the number of results per page
            .skip((page - 1) * limit); // Calculate the offset based on the page number

        res.status(200).json({
            success: true,
            message: "Products Searched successfully",
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            success: false,
            message: "Error searching products using the keyword",
            error: error.message
        });
    }
};

const getAllProductsController = async (req, res) => {
    // console.log("Inside getAllProductsController");

    try {
        const allProducts = await Product.find();
        if (!allProducts) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Sorry, Error while getting all products. Seems like no product exists....",
                    allProducts: allProducts,
                }
            );
        }
        const allProductsName = allProducts.map((item) => {
            return item.name;
        });

        return res.status(200).json(
            {
                success: true,
                message: "Successfully got all products....",
                allProductsName,
                allProducts,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong in get all products....",
                allProductsName,
                allProducts,
            }
        );
    }
};

const getAllProductsByCategoryController = async (req, res) => {
    // console.log("Inside getAllProductsByCategoryController");

    // console.log(req.params);
    const categoryId = req.params.categoryId;

    try {
        const allProducts = await Product.find({categoryId: categoryId});
        if(!allProducts){
            return res.status(400).json(
                {
                    success: false,
                    message: "Sorry, There exists no product with given category....",
                    categoryId: categoryId,
                }
            );
        }

        const allProductsName = allProducts.map((item) => {
            return item.name;
        });

        return res.status(200).json(
            {
                success: true,
                message: "Successfully got all products by category....",
                allProductsName,
                allProducts,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong in get all products by category....",
                allProductsName,
                allProducts,
            }
        );
    }
};

const createProductController = async (req, res) => {
    // console.log("Inside createProductController");

    // console.log(req.body);
    const { name, description, price, photo } = req.body;

    if (!name) {
        return res.send({
            success: false,
            message: "Name of Product is required....",
        });
    }
    if (!description) {
        return res.send({
            success: false,
            message: "Description of Product is required....",
        });
    }
    if (!price) {
        return res.send({
            success: false,
            message: "Price of Product is required....",
        });
    }
    if (!photo) {
        return res.send({
            success: false,
            message: "Photo of Product is required....",
        });
    }

    // console.log(req.params);
    const categoryId = req.params.categoryId;

    const slug = slugify(name,
        {
            lower: true,
            remove: /[^a-zA-Z0-9\s]/g,
        }
    );

    // console.log("Slugify package removed spaces and special characters and lowercased the name :" + slug);

    const existingProduct = await Product.findOne({slug: slug});
    if(existingProduct){
        return res.status(400).json(
            {
                success: false,
                message: "Sorry, Error while creating new product. Product already exists with this name....",
                existingProduct,
            }
        );
    }

    const newProduct = {
        name: name,
        slug: slug,
        description: description,
        price: price,
        photo: photo,
        categoryId: categoryId,
    };

    // console.log(newProduct);

    try {
        const productCreated = await new Product(newProduct).save();
        return res.status(201).json(
            {
                success: true,
                message: "Product Created Successfully....",
                productCreated,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong in Create Product....",
                error,
            }
        );
    }
};

const getProductController = async (req, res) => {
    // console.log("Inside getProductController");

    // console.log(req.params);
    const productSlug = req.params.productSlug;

    try {
        const desiredProduct = await Product.findOne({ slug: productSlug }).populate('categoryId');
        if(!desiredProduct){
            return res.status(400).json(
                {
                    success: false,
                    message: "Sorry, Error while getting a product. No products exist with this name....",
                    desiredProduct,
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                message: "Successfully got the product....",
                desiredProductName: desiredProduct.name,
                desiredProduct,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong in Get Product....",
                error,
            }
        );
    }

};

const updateProductController = async (req, res) => {
    // console.log("Inside updateProductController");

    // console.log(req.params);
    const productSlug = req.params.productSlug;

    const { name, price, description, photo } = req.body;

    const slug = slugify(name,
        {
            lower: true,
            remove: /[^a-zA-Z0-9\s]/g,
        }
    );

    const updatesInProduct = {
        name: name,
        slug: slug,
        description: description,
        price: price,
        photo: photo,
    };


    try {
        const desiredProductToUpdate = await Product.findOneAndUpdate(
            {
                slug: productSlug
            },
            updatesInProduct
        );
        if(!desiredProductToUpdate){
            return res.status(400).json(
                {
                    success: false,
                    message: "Sorry, Error while updating a product. No products exist with this name....",
                    desiredProductToUpdate,
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                message: "Successfully got updated the product....",
                desiredProductToUpdate,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong in Update Product....",
                error,
            }
        );
    }
};

const deleteProductController = async (req, res) => {
    // console.log("Inside deleteProductController");

    // console.log(req.params);
    const productSlug = req.params.productSlug;

    try {
        const desiredProductToDelete = await Product.findOneAndDelete({ slug: productSlug });
        if(!desiredProductToDelete){
            return res.status(400).json(
                {
                    success: false,
                    message: "Sorry, Error while deleting a product. No products exist with this name....",
                    desiredProductToDelete,
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                message: "Successfully deleted the product....",
                desiredProductToDelete,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong in Delete Product....",
                error,
            }
        );
    }
};

export { getProductsAsPerPageAndLimitController, searchProductsByKeywordAndPageAndLimitController,getAllProductsController, getAllProductsByCategoryController, createProductController, getProductController, updateProductController, deleteProductController };