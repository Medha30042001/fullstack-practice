import express from 'express';
import { login, signup } from '../controller/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);

router.get('/home', authenticate, (req, res) => {
    res.json({
        message : `Welcome ${req.user.role}!`
    })
})

export default router;