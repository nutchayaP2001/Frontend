import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    userCart,
    getUserCart
} from '../controllers/UserController.js';
// import { createLocation, listDistrict, listProvince, listSubdistrict } from '../controllers/LocationController.js';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly ,getUserById);
router.post('/users', verifyUser, adminOnly,createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

router.post('/users/carts',verifyUser,userCart)
router.get('/users/carts',verifyUser,getUserCart)

// router.post('/location', createLocation)
// router.get('/province', listProvince)
// router.get('/district/:id', listDistrict)
// router.get('/subdistrict/:id', listSubdistrict)

export default router;