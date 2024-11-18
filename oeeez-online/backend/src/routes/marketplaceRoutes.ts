import express from 'express';
import { body } from 'express-validator';
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/marketplaceController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Product description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  validate,
  createProduct
);

router.get('/', getProducts);

router.get('/:id', getProduct);

router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Product description cannot be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  ],
  validate,
  updateProduct
);

router.delete('/:id', deleteProduct);

export default router;
