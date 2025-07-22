import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/userController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // optional

export default router;
