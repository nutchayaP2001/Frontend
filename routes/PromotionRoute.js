import express from 'express';
import {
    getPromotion,
    getPromotionById,
    createPromotion,
    updatePromotion,
    deletePromotion
} from '../controllers/PromotionController.js';
import { verifyUser } from '../middleware/AuthUser.js';


const router = express.Router();

router.get('/promotions', verifyUser,getPromotion);
router.get('/promotions/:id', getPromotionById);
router.post('/promotions',verifyUser, createPromotion);
router.patch('/promotions/:id', updatePromotion);
router.delete('/promotions/:id', deletePromotion)


export default router;