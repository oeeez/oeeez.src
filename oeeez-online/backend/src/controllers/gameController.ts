import { Request, Response } from 'express';
import { Game } from '../models/Game';

export const createGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, genre, maxPlayers } = req.body;
    const game = new Game({
      name,
      description,
      genre,
      maxPlayers,
      creator: req.user.id,
    });

    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const games = await Game.find().populate('creator', 'username');
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findById(req.params.id).populate('creator', 'username');
    if (!game) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, genre, maxPlayers } = req.body;
    const game = await Game.findOneAndUpdate(
      { _id: req.params.id, creator: req.user.id },
      { name, description, genre, maxPlayers },
      { new: true, runValidators: true }
    );

    if (!game) {
      res.status(404).json({ message: 'Game not found or unauthorized' });
      return;
    }

    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findOneAndDelete({ _id: req.params.id, creator: req.user.id });
    if (!game) {
      res.status(404).json({ message: 'Game not found or unauthorized' });
      return;
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
