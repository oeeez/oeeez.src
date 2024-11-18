import { AuthService } from '../../backend/src/services/AuthService';
import { User } from '../../backend/src/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../backend/src/models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
        save: jest.fn(),
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User as unknown as jest.Mock).mockImplementation(() => mockUser);

      const result = await AuthService.registerUser('testuser', 'test@example.com', 'password123');

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(User).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

      await expect(AuthService.registerUser('testuser', 'test@example.com', 'password123'))
        .rejects
        .toThrow('User already exists');
    });
  });

  // Add more tests for loginUser, generateToken, and verifyToken methods
});
