import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import marketplaceRoutes from './routes/marketplaceRoutes';
import bankingRoutes from './routes/bankingRoutes';
import gameRoutes from './routes/gameRoutes';

import { notFound, errorHandler } from './middleware/errorMiddleware';
import logger from './utils/logger';

config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/banking', bankingRoutes);
app.use('/api/games', gameRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oeeez';
mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(\`Server running on port \${PORT}\`);
});

export default app;
