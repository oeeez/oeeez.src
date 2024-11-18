import express from 'express';
import { body } from 'express-validator';
import {
  createContent,
  getContents,
  getContent,
  updateContent,
  deleteContent,
} from '../controllers/contentController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('body').notEmpty().withMessage('Content body is required'),
    body('type').isIn(['article', 'video', 'image']).withMessage('Invalid content type'),
  ],
  validate,
  createContent
);

router.get('/', getContents);

router.get('/:id', getContent);

router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('body').optional().notEmpty().withMessage('Content body cannot be empty'),
    body('type').optional().isIn(['article', 'video', 'image']).withMessage('Invalid content type'),
  ],
  validate,
  updateContent
);

router.delete('/:id', deleteContent);

export default router;
