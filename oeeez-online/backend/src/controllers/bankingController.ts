import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { User } from '../models/User';

export const getBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, type, description } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (type === 'debit' && user.balance < amount) {
      res.status(400).json({ message: 'Insufficient funds' });
      return;
    }

    const newBalance = type === 'credit' ? user.balance + amount : user.balance - amount;

    const transaction = new Transaction({
      user: req.user.id,
      amount,
      type,
      description,
      balanceAfter: newBalance,
    });

    await transaction.save();
    user.balance = newBalance;
    await user.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
