import express from 'express';
import { body } from 'express-validator';
import { getBalance, createTransaction, getTransactions } from '../controllers/bankingController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

router.use(protect);

router.get('/balance', getBalance);

router.post(
  '/transaction',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('type').isIn(['credit', 'debit']).withMessage('Invalid transaction type'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  validate,
  createTransaction
);

router.get('/transactions', getTransactions);

export default router;
