import { User, IUser } from '../models/User';

export class UserService {
  static async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId).select('-password');
  }

  static async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
  }

  static async deleteUser(userId: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(userId);
    return !!result;
  }

  static async getAllUsers(): Promise<IUser[]> {
    return User.find().select('-password');
  }
}
