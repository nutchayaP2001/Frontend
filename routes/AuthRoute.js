import express from 'express';
import {Login, logOut, Me,LoginCus, MeCustomer} from '../controllers/Auth.js';
// import { Login, Register } from '../controllers/Auth.js';


const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);
router.post('/logincus', LoginCus);
router.get('/mecustomer', MeCustomer);

// http://localhost:3000/register
// router.post('/register',Register)
// http://localhost:3000/login
// router.post('/login',Login)

export default router;