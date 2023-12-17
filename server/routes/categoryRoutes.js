import express from "express";
import { checkIfAdminMiddleware, isRegisteredUserTokenIsPresentMiddleware } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from "../controllers/categoryControllers.js";


// Router to access Category related routes
const categoryRouter = express.Router();

// Routes

/**
 * @categoryRouter /api/v1/category/create-category
 * @description Create new category
 * @access protected
 */
categoryRouter.post("/create-category",isRegisteredUserTokenIsPresentMiddleware,checkIfAdminMiddleware,createCategoryController);

/**
 * @categoryRouter /api/v1/category/get-all-categories
 * @description Get all Categories
 * @access public
 */
categoryRouter.get("/get-all-categories",getAllCategoryController);

/**
 * @categoryRouter /api/v1/category/update-category/:id
 * @description Update Category
 * @access protected
 */
categoryRouter.put("/update-category/:id",isRegisteredUserTokenIsPresentMiddleware,checkIfAdminMiddleware,updateCategoryController);

/**
 * @categoryRouter /api/v1/category/delete-category/:id
 * @description Delete Category
 * @access protected
 */
categoryRouter.delete("/delete-category/:id",isRegisteredUserTokenIsPresentMiddleware,checkIfAdminMiddleware,deleteCategoryController);



export default categoryRouter;
