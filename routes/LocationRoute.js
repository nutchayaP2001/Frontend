import express from 'express';
import { createLocation, listDistrict, listProvince, listSubdistrict,getDistrict } from '../controllers/LocationController.js';
// import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
const router = express.Router();

router.post('/location', createLocation)
router.get('/province', listProvince)
router.get('/district/:id', listDistrict)
router.get('/subdistrict/:id', listSubdistrict)

router.get('/districtBy', getDistrict)



export default router;