import { Transaction, ITransaction } from '../models/Transaction';
import { User, IUser } from '../models/User';

export class BankingService {
  static async getBalance(userId: string): Promise<number> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.balance;
  }

  static async createTransaction(userId: string, amount: number, type: 'credit' | 'debit', description: string): Promise<ITransaction> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (type === 'debit' && user.balance < amount) {
      throw new Error('Insufficient funds');
    }

    const newBalance = type === 'credit' ? user.balance + amount : user.balance - amount;

    const transaction = new Transaction({
      user: userId,
      amount,
      type,
      description,
      balanceAfter: newBalance,
    });

    await transaction.save();
    user.balance = newBalance;
    await user.save();

    return transaction;
  }

  static async getTransactions(userId: string): Promise<ITransaction[]> {
    return Transaction.find({ user: userId }).sort({ createdAt: -1 });
  }
}
