import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { JWT_SECRET, JWT_EXPIRE } from '../config/env';

export class AuthService {
  static async registerUser(username: string, email: string, password: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = new User({ username, email, password });
    await user.save();

    return user;
  }

  static async loginUser(email: string, password: string): Promise<{ token: string; user: IUser }> {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRE,
    });

    return { token, user };
  }

  static generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRE,
    });
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET as string);
  }
}
