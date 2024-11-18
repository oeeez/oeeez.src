import dotenv from 'dotenv';

dotenv.config();

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRE,
} = process.env;

export const isProduction = NODE_ENV === 'production';
