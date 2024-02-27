import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getBy,
    getProductsSale,
    // searchFilters
} from '../controllers/ProductController.js';
// import { verifyCustomer } from '../middleware/AuthUser.js';
import { verifyUser } from '../middleware/AuthUser.js';

// Middleware
// import {auth} from '../middleware/AuthUser.js'

// import { upload } from '../middleware/UploadFile.js';

const router = express.Router();

router.get('/products',verifyUser, getProducts);
router.get('/productsale', getProductsSale);
router.post('/products',verifyUser,  createProduct);
router.delete('/products/:id', verifyUser, deleteProduct);

// Update
router.get('/product/:id', verifyUser, getProductById);
router.patch('/products/:id',verifyUser, updateProduct);

router.post('/productby', getBy);


// Search
// router.post('/search/filters',searchFilters)



export default router;