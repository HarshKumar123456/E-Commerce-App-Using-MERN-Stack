import express from "express";
import { checkIfAdminMiddleware, isRegisteredUserTokenIsPresentMiddleware } from "../middlewares/authMiddleware.js";
import { getAllProductsController, getAllProductsByCategoryController,createProductController, getProductController, updateProductController, deleteProductController, getProductsAsPerPageAndLimitController, searchProductsByKeywordAndPageAndLimitController } from "../controllers/productControllers.js";

// Router to access Product related routes
const productRouter = express.Router();

// Routes


/**
 * @productRouter /api/v1/product/get-products/:page/:limit
 * @description Get products as per page and limit 
 * @access public
 */
productRouter.get("/get-products/:page/:limit",getProductsAsPerPageAndLimitController);

/**
 * @productRouter /api/v1/product/search-products/:keyword/:page/:limit
 * @description Get products as per page and limit 
 * @access public
 */
productRouter.get("/search-products/:keyword/:page/:limit",searchProductsByKeywordAndPageAndLimitController);


/**
 * @productRouter /api/v1/product/get-all-products
 * @description Get All products
 * @access public
 */
productRouter.get("/get-all-products",getAllProductsController);


/**
 * @productRouter /api/v1/product/get-all-products/:categoryId
 * @description Get All products of a category
 * @access public
 */
productRouter.get("/get-all-products/:categoryId",getAllProductsByCategoryController);


/**
 * @productRouter /api/v1/product/get-product/:productSlug
 * @description Get a product
 * @access public
 */
productRouter.get("/get-product/:productSlug",getProductController);

/**
 * @productRouter /api/v1/product/create-product/:categoryId
 * @description Create a product
 * @access protected
 */
productRouter.post("/create-product/:categoryId",isRegisteredUserTokenIsPresentMiddleware,checkIfAdminMiddleware,createProductController);

/**
 * @productRouter /api/v1/product/update-product/:productSlug
 * @description Update a product
 * @access protected
 */
productRouter.put("/update-product/:productSlug",isRegisteredUserTokenIsPresentMiddleware,checkIfAdminMiddleware,updateProductController);

/**
 * @productRouter /api/v1/product/delete-product/:productSlug
 * @description Delete a product
 * @access protected
 */
productRouter.delete("/delete-product/:productSlug",isRegisteredUserTokenIsPresentMiddleware,checkIfAdminMiddleware,deleteProductController);



export default productRouter;