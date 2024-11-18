import { body, ValidationChain } from 'express-validator';

export const registerValidation: ValidationChain[] = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const loginValidation: ValidationChain[] = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const contentValidation: ValidationChain[] = [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Content body is required'),
  body('type').isIn(['article', 'video', 'image']).withMessage('Invalid content type'),
];

export const productValidation: ValidationChain[] = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
];

export const transactionValidation: ValidationChain[] = [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('type').isIn(['credit', 'debit']).withMessage('Invalid transaction type'),
  body('description').notEmpty().withMessage('Description is required'),
];

export const gameValidation: ValidationChain[] = [
  body('name').notEmpty().withMessage('Game name is required'),
  body('description').notEmpty().withMessage('Game description is required'),
  body('genre').notEmpty().withMessage('Game genre is required'),
  body('maxPlayers').isInt({ min: 1 }).withMessage('Max players must be a positive integer'),
];
