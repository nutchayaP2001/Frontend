import express from 'express';
import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from '../controllers/CustomerController.js';
import { verifyCustomer, customerOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/customers',verifyCustomer, customerOnly,getCustomers);
router.get('/customers/:id',verifyCustomer, customerOnly,  getCustomerById);
router.post('/customers', createCustomer);
router.patch('/customers/:id',verifyCustomer, customerOnly, updateCustomer);
router.delete('/customers/:id', verifyCustomer, customerOnly,deleteCustomer);

export default router;