import express from 'express';
import {
    getProductDamage,
    getProductDamageById,
    createProductDamage,
    updateStatusProductDamage,
    deleteProductDamage,
    // getAdmin
} from '../controllers/ProductDamageController.js';
import { verifyCustomer, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/productdamages',verifyUser, getProductDamage);
// router.get('/productadmin',verifyUser, getAdmin);
router.get('/productdamages/:id', getProductDamageById);
router.post('/productdamages', verifyCustomer,createProductDamage);
router.patch('/productdamages/:id', verifyUser, updateStatusProductDamage);
router.delete('/productdamages/:id', deleteProductDamage);

export default router;