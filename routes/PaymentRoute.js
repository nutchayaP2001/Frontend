import express from 'express';
import {
    getPayments,
    getPaymentById,
    createPayments,
    updatePayments,
    deletePayments,
    createPaymentStatus
} from '../controllers/PaymentController.js';

import { verifyUser, verifyCustomer } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/payments',verifyUser,getPayments);
router.get('/payments/:id', verifyUser, getPaymentById);
router.post('/payments',verifyCustomer, createPayments);
router.patch('/paymentstatus/:id', verifyUser, createPaymentStatus);
router.patch('/payments/:id',verifyUser, updatePayments);
router.delete('/payments/:id',deletePayments);



export default router;