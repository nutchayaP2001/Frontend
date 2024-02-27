import express from 'express';
import { SaveNumberSale, getSale } from '../controllers/SaleController.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/salesnumber', verifyUser, getSale);
router.post('/salesnumber', verifyUser, SaveNumberSale);

export default router;
