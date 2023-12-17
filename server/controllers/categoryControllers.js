import "dotenv/config";
import slugify from "slugify";
import Category from "../models/categoryModel.js";

const createCategoryController = async (req, res) => {

    // Extracting Category name from body
    // console.log(req.body);
    const { name } = req.body;

    const slug = slugify(name,
        {
            lower: true,
            remove: /[^a-zA-Z0-9\s]/g,
        }
    );

    // console.log("Slugify package removed spaces and special characters and lowercased the name :" + slug);
    // console.log("Hello Let's Create a new category....");
    const newCategory = {
        name: name,
        slug: slug
    };

    try {
        const category = await new Category(newCategory).save();
        console.log("Category Created....");
        return res.status(201).json(
            {
                success: true,
                message: `${name} Category Added successfully....`,
                category,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: `Something went wrong in Create Category....`,
                error,
            }
        );
    }
};

const getAllCategoryController = async (req, res) => {
    try {
        const allCategories = await Category.find();
        const allCategoriesName = allCategories.map((item) => {
            return item.name;
        })
        return res.status(200).json(
            {
                success: true,
                message: `Successfully got all categories....`,
                allCategoriesName,
                allCategories,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: `Something went wrong in Get All Categories....`,
                error,
            }
        );
    }
};

const updateCategoryController = async (req, res) => {

    // console.log(req.params);
    const idOfCategory = req.params.id;

    // console.log(req.body);
    const newNameOfCategory = req.body.name;
    const newSlugOfCategory = slugify(newNameOfCategory,
        {
            lower: true,
            remove: /[^a-zA-Z0-9\s]/g,
        });

    try {
        const updatedCategory = await Category.findOneAndUpdate(
            {
                _id: idOfCategory,
            },
            {
                name: newNameOfCategory,
                slug: newSlugOfCategory,
            }
        );
        return res.status(200).json(
            {
                success: true,
                message: `Successfully updated category ....`,
                updatedCategoryName: `${updatedCategory.name}`,
                updatedCategory,
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: `Something went wrong in Update Categories....`,
                error,
            }
        );
    }
};

const deleteCategoryController = async (req, res) => {
    // console.log(req.params);
    const idOfCategory = req.params.id;

    try {
        const deletedCategory = await Category.findOneAndDelete(
            {
                _id: idOfCategory,
            },
        );
        return res.status(200).json(
            {
                success: true,
                message: `Successfully deleted category ....`,
                deletedCategoryName: `${deletedCategory.name}`,
                deletedCategory,
            }
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: `Something went wrong in Delete Categories....`,
                error,
            }
        );
    }
};

export { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController };