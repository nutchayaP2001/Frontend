import express from 'express';
import { verifyUser } from '../middleware/AuthUser.js';
import { deleteCart, getCartById, getCartPage, postCartPage, updateCart } from '../controllers/CartController.js';


const router = express.Router();

router.get('/cart', verifyUser,getCartPage);
router.get('/cart/:id', getCartById);
router.post('/cart',verifyUser, postCartPage);
router.patch('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart)


export default router;