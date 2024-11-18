import express from 'express';
import { body } from 'express-validator';
import {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
} from '../controllers/gameController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Game name is required'),
    body('description').notEmpty().withMessage('Game description is required'),
    body('genre').notEmpty().withMessage('Game genre is required'),
    body('maxPlayers').isInt({ min: 1 }).withMessage('Max players must be a positive integer'),
  ],
  validate,
  createGame
);

router.get('/', getGames);

router.get('/:id', getGame);

router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Game name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Game description cannot be empty'),
    body('genre').optional().notEmpty().withMessage('Game genre cannot be empty'),
    body('maxPlayers').optional().isInt({ min: 1 }).withMessage('Max players must be a positive integer'),
  ],
  validate,
  updateGame
);

router.delete('/:id', deleteGame);

export default router;
