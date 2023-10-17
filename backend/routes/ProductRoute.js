import express from "express";
import {
    getProducts,
    getAllProducts,
    getProductById,
    createProduct,
    updateStock,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/products', verifyUser, getProducts);
router.get('/products/:id', verifyUser, getProductById);
router.get('/productsall', verifyUser, getAllProducts);
router.post('/products', verifyUser, createProduct);
router.patch('/products/:id', verifyUser, updateProduct);
router.patch('/stock/:id', verifyUser, updateStock);
router.delete('/products/:id', verifyUser, deleteProduct);

export default router;