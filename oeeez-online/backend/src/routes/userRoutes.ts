import express from 'express';
import { body } from 'express-validator';
import { getProfile, updateProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);

router.put(
  '/profile',
  [
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Please enter a valid email'),
  ],
  validate,
  updateProfile
);

export default router;
