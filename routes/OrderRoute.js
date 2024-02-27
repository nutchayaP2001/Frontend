import express from 'express';
import {
    getOrders,
    getOrderCus,
    getOrderById,
    createOrder,
    createOrderStatus,
    updateOrder,
    deleteOrder
} from '../controllers/OrderController.js';

import { verifyUser, verifyCustomer } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/orders', verifyUser, getOrders);
router.get('/ordercus', verifyCustomer, getOrderCus);
router.get('/orders/:id', verifyUser, getOrderById);
router.post('/orders', verifyCustomer, createOrder);
router.patch('/orderstatus/:id', verifyUser, createOrderStatus);
router.patch('/orders/:id', verifyUser, updateOrder);
router.delete('/orders/:id', verifyUser, deleteOrder);

export default router;